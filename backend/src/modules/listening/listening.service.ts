import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ListeningService {
  constructor(private prisma: PrismaService) {}

  async getAssets(filters: any = {}) {
    const where: any = { isPublished: true };
    if (filters.level) where.level = filters.level;
    return this.prisma.listeningAsset.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getExercises(level?: string) {
    const where: any = { isPublished: true, skill: 'LISTENING' };
    if (level) where.level = level;
    return this.prisma.exercise.findMany({ where, orderBy: { difficulty: 'asc' } });
  }
}
