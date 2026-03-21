import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ReadingService {
  constructor(private prisma: PrismaService) {}

  async getPassages(filters: any = {}) {
    const where: any = { isPublished: true };
    if (filters.level) where.level = filters.level;
    if (filters.textType) where.textType = filters.textType;
    return this.prisma.readingPassage.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getExercises(level?: string) {
    const where: any = { isPublished: true, skill: 'READING' };
    if (level) where.level = level;
    return this.prisma.exercise.findMany({ where, orderBy: { difficulty: 'asc' } });
  }
}
