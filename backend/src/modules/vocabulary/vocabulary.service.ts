import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async getItemsByLevel(level: string, page = 1, limit = 20) {
    const [items, total] = await Promise.all([
      this.prisma.vocabularyItem.findMany({
        where: { level: level as any, isPublished: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { frequency: 'asc' },
      }),
      this.prisma.vocabularyItem.count({
        where: { level: level as any, isPublished: true },
      }),
    ]);
    return { items, total, page, limit };
  }

  async getDueReviews(userId: string, limit = 20) {
    return this.prisma.vocabularyReview.findMany({
      where: { userId, nextReview: { lte: new Date() } },
      include: { vocab: true },
      take: limit,
      orderBy: { nextReview: 'asc' },
    });
  }

  async submitReview(userId: string, vocabId: string, quality: number) {
    // SM-2 algorithm implementation
    let review = await this.prisma.vocabularyReview.findUnique({
      where: { userId_vocabId: { userId, vocabId } },
    });

    if (!review) {
      review = await this.prisma.vocabularyReview.create({
        data: { userId, vocabId, easeFactor: 2.5, interval: 1, repetitions: 0 },
      });
    }

    let { easeFactor, interval, repetitions } = review;

    // SM-2: quality 0-5 (0-2 = fail, 3-5 = pass)
    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    }

    easeFactor = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    );

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const status =
      repetitions >= 5 ? 'mastered' : repetitions >= 1 ? 'reviewing' : 'learning';

    return this.prisma.vocabularyReview.update({
      where: { id: review.id },
      data: {
        easeFactor,
        interval,
        repetitions,
        nextReview,
        lastReview: new Date(),
        status,
      },
    });
  }

  async saveWord(userId: string, vocabId: string, source?: string) {
    return this.prisma.savedWord.upsert({
      where: { userId_vocabId: { userId, vocabId } },
      update: {},
      create: { userId, vocabId, source },
    });
  }

  async getSavedWords(userId: string) {
    return this.prisma.savedWord.findMany({
      where: { userId },
      include: { vocab: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats(userId: string) {
    const [total, learning, reviewing, mastered] = await Promise.all([
      this.prisma.vocabularyReview.count({ where: { userId } }),
      this.prisma.vocabularyReview.count({ where: { userId, status: 'learning' } }),
      this.prisma.vocabularyReview.count({ where: { userId, status: 'reviewing' } }),
      this.prisma.vocabularyReview.count({ where: { userId, status: 'mastered' } }),
    ]);
    return { total, learning, reviewing, mastered };
  }
}
