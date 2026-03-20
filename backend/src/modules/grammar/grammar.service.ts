import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) {}

  async getTopics(filters?: { level?: string; category?: string }) {
    const where: any = { isPublished: true };
    if (filters?.level) where.level = filters.level;
    if (filters?.category) where.category = filters.category;
    return this.prisma.grammarTopic.findMany({
      where,
      orderBy: [{ level: 'asc' }, { orderIndex: 'asc' }],
    });
  }

  async getBySlug(slug: string) {
    const topic = await this.prisma.grammarTopic.findUnique({ where: { slug } });
    if (!topic) throw new NotFoundException('Grammar topic not found');
    return topic;
  }
}
