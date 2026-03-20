import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, goals: true, subscription: true, streaks: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const { passwordHash, ...safe } = user;
    return safe;
  }

  async updateProfile(userId: string, data: {
    displayName?: string;
    avatarUrl?: string;
    timezone?: string;
    nativeLanguage?: string;
    dailyGoalMinutes?: number;
  }) {
    return this.prisma.userProfile.update({ where: { userId }, data });
  }

  async getDashboardData(userId: string) {
    const [user, streak, recentProgress, dueVocab, unresolvedMistakes] =
      await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          include: { profile: true, goals: true, subscription: true },
        }),
        this.prisma.streak.findUnique({ where: { userId } }),
        this.prisma.progressRecord.findMany({
          where: { userId }, orderBy: { createdAt: 'desc' }, take: 20,
        }),
        this.prisma.vocabularyReview.count({
          where: { userId, nextReview: { lte: new Date() } },
        }),
        this.prisma.mistakeEntry.count({
          where: { userId, isResolved: false },
        }),
      ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayXp = recentProgress
      .filter((p) => p.createdAt >= today)
      .reduce((sum, p) => sum + p.xpEarned, 0);

    const totalXp = await this.prisma.progressRecord.aggregate({
      where: { userId }, _sum: { xpEarned: true },
    });

    return {
      user,
      streak: streak || { currentStreak: 0, longestStreak: 0 },
      todayXp,
      totalXp: totalXp._sum.xpEarned || 0,
      vocabDueCount: dueVocab,
      unresolvedMistakes,
      recentActivity: recentProgress.slice(0, 10),
    };
  }
}
