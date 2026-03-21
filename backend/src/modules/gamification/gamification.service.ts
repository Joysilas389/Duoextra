import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async addXp(userId: string, amount: number, source: string) {
    return this.prisma.progressRecord.create({
      data: { userId, type: source, xpEarned: amount },
    });
  }

  async updateStreak(userId: string) {
    const streak = await this.prisma.streak.findUnique({ where: { userId } });
    if (!streak) {
      return this.prisma.streak.create({
        data: { userId, currentStreak: 1, longestStreak: 1, lastActiveDate: new Date() },
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = streak.lastActiveDate
      ? new Date(streak.lastActiveDate)
      : null;
    if (lastActive) lastActive.setHours(0, 0, 0, 0);

    const diffDays = lastActive
      ? Math.floor((today.getTime() - lastActive.getTime()) / 86400000)
      : 999;

    let newStreak = streak.currentStreak;
    if (diffDays === 0) return streak; // Already counted today
    else if (diffDays === 1) newStreak++;
    else newStreak = 1; // Streak broken

    return this.prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streak.longestStreak),
        lastActiveDate: new Date(),
      },
    });
  }

  async getBadges(userId: string) {
    return this.prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });
  }

  async checkAndAwardBadges(userId: string) {
    const [totalXp, streak, lessonsCompleted] = await Promise.all([
      this.prisma.progressRecord.aggregate({
        where: { userId }, _sum: { xpEarned: true },
      }),
      this.prisma.streak.findUnique({ where: { userId } }),
      this.prisma.progressRecord.count({
        where: { userId, type: 'lesson_complete' },
      }),
    ]);

    const xp = totalXp._sum.xpEarned || 0;
    const badges = await this.prisma.badge.findMany({ where: { isActive: true } });
    const earned = await this.prisma.userBadge.findMany({ where: { userId } });
    const earnedIds = new Set(earned.map((e) => e.badgeId));

    const newBadges: any[] = [];
    for (const badge of badges) {
      if (earnedIds.has(badge.id)) continue;
      const criteria = badge.criteria as any;
      let shouldAward = false;
      if (criteria.type === 'xp_total' && xp >= criteria.threshold) shouldAward = true;
      if (criteria.type === 'streak' && (streak?.currentStreak || 0) >= criteria.threshold) shouldAward = true;
      if (criteria.type === 'lessons' && lessonsCompleted >= criteria.threshold) shouldAward = true;

      if (shouldAward) {
        const ub = await this.prisma.userBadge.create({
          data: { userId, badgeId: badge.id },
          include: { badge: true },
        });
        newBadges.push(ub);
      }
    }
    return newBadges;
  }

  async getLeaderboard(limit = 20) {
    const leaders = await this.prisma.progressRecord.groupBy({
      by: ['userId'],
      _sum: { xpEarned: true },
      orderBy: { _sum: { xpEarned: 'desc' } },
      take: limit,
    });
    const userIds = leaders.map((l) => l.userId);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      include: { profile: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    return leaders.map((l, i) => ({
      rank: i + 1,
      userId: l.userId,
      displayName: userMap.get(l.userId)?.profile?.displayName,
      totalXp: l._sum.xpEarned || 0,
    }));
  }
}
