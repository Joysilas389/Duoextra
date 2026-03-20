import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getLearnerAnalytics(userId: string) {
    const [
      totalXp, totalTime, skillBreakdown, weeklyActivity,
      vocabStats, mockHistory
    ] = await Promise.all([
      this.prisma.progressRecord.aggregate({
        where: { userId }, _sum: { xpEarned: true, timeSpent: true },
      }),
      this.prisma.progressRecord.aggregate({
        where: { userId }, _sum: { timeSpent: true },
      }),
      this.prisma.progressRecord.groupBy({
        by: ['skill'],
        where: { userId, skill: { not: null } },
        _avg: { accuracy: true },
        _count: true,
      }),
      this.getWeeklyActivity(userId),
      this.getVocabRetention(userId),
      this.prisma.mockExamAttempt.findMany({
        where: { userId, status: 'graded' },
        select: { totalScore: true, maxScore: true, startedAt: true },
        orderBy: { startedAt: 'desc' },
        take: 10,
      }),
    ]);

    return {
      totalXp: totalXp._sum.xpEarned || 0,
      totalMinutes: Math.round((totalTime._sum.timeSpent || 0) / 60),
      skillBreakdown,
      weeklyActivity,
      vocabStats,
      mockExamTrend: mockHistory,
    };
  }

  private async getWeeklyActivity(userId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const records = await this.prisma.progressRecord.findMany({
      where: { userId, createdAt: { gte: sevenDaysAgo } },
      select: { xpEarned: true, timeSpent: true, createdAt: true },
    });

    const dayMap = new Map<string, { xp: number; minutes: number }>();
    for (const r of records) {
      const day = r.createdAt.toISOString().split('T')[0];
      const existing = dayMap.get(day) || { xp: 0, minutes: 0 };
      existing.xp += r.xpEarned;
      existing.minutes += Math.round((r.timeSpent || 0) / 60);
      dayMap.set(day, existing);
    }

    return Array.from(dayMap.entries()).map(([date, data]) => ({ date, ...data }));
  }

  private async getVocabRetention(userId: string) {
    const stats = await this.prisma.vocabularyReview.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });
    return stats.reduce((acc, s) => ({ ...acc, [s.status]: s._count }), {});
  }
}
