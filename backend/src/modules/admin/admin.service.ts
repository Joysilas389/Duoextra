import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Exam providers
  async createProvider(data: any) {
    return this.prisma.examProvider.create({ data });
  }
  async getProviders() {
    return this.prisma.examProvider.findMany({ include: { exams: true } });
  }

  // Lessons CRUD
  async createLesson(data: any) {
    return this.prisma.lesson.create({ data });
  }
  async updateLesson(id: string, data: any) {
    return this.prisma.lesson.update({ where: { id }, data });
  }
  async deleteLesson(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  // Exercises CRUD
  async createExercise(data: any) {
    return this.prisma.exercise.create({ data });
  }
  async updateExercise(id: string, data: any) {
    return this.prisma.exercise.update({ where: { id }, data });
  }

  // Content versioning
  async publishContent(entityType: string, entityId: string, publishedBy: string) {
    const entity = await (this.prisma as any)[entityType].findUnique({
      where: { id: entityId },
    });
    if (!entity) return null;

    const latestVersion = await this.prisma.contentVersion.findFirst({
      where: { entityType, entityId },
      orderBy: { version: 'desc' },
    });

    return this.prisma.contentVersion.create({
      data: {
        entityType,
        entityId,
        version: (latestVersion?.version || 0) + 1,
        data: entity as any,
        status: 'published',
        publishedAt: new Date(),
        publishedBy,
      },
    });
  }

  // Dashboard stats
  async getDashboardStats() {
    const [users, lessons, exercises, submissions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.lesson.count(),
      this.prisma.exercise.count(),
      this.prisma.submission.count(),
    ]);
    return { users, lessons, exercises, submissions };
  }
}
