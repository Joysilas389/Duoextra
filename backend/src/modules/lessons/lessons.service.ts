import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    skill?: string;
    level?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) {
    const { skill, level, type, page = 1, limit = 20 } = filters;
    const where: any = { isPublished: true };
    if (skill) where.skill = skill;
    if (level) where.level = level;
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.lesson.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { orderIndex: 'asc' },
        include: { unit: { include: { pathway: true } } },
      }),
      this.prisma.lesson.count({ where }),
    ]);
    return { items, total, page, limit };
  }

  async findBySlug(slug: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { slug },
      include: {
        steps: {
          orderBy: { orderIndex: 'asc' },
          include: { exercise: true },
        },
      },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async completeLesson(userId: string, lessonId: string, data: {
    accuracy: number;
    timeSpent: number;
    xpEarned: number;
  }) {
    return this.prisma.progressRecord.create({
      data: {
        userId,
        lessonId,
        type: 'lesson_complete',
        xpEarned: data.xpEarned,
        accuracy: data.accuracy,
        timeSpent: data.timeSpent,
      },
    });
  }

  async getNextRecommended(userId: string) {
    // Find last completed lesson and suggest next
    const lastProgress = await this.prisma.progressRecord.findFirst({
      where: { userId, type: 'lesson_complete' },
      orderBy: { createdAt: 'desc' },
      include: { lesson: true },
    });

    if (!lastProgress?.lesson) {
      // Return first lesson of first pathway
      return this.prisma.lesson.findFirst({
        where: { isPublished: true },
        orderBy: { orderIndex: 'asc' },
      });
    }

    // Find next lesson in same unit/pathway
    return this.prisma.lesson.findFirst({
      where: {
        isPublished: true,
        unitId: lastProgress.lesson.unitId,
        orderIndex: { gt: lastProgress.lesson.orderIndex },
      },
      orderBy: { orderIndex: 'asc' },
    });
  }
}
