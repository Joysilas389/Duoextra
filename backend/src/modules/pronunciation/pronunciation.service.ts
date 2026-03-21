import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PronunciationService {
  constructor(private prisma: PrismaService) {}

  async getDrills(filters: any = {}) {
    const where: any = { isPublished: true };
    if (filters.level) where.level = filters.level;
    if (filters.type) where.type = filters.type;
    return this.prisma.pronunciationDrill.findMany({ where, orderBy: { createdAt: 'desc' } });
  }
}
