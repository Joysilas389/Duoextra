import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    scenario?: string;
    level?: string;
    formality?: string;
    page?: number;
    limit?: number;
  }) {
    const { scenario, level, formality, page = 1, limit = 20 } = filters;
    const where: any = { isPublished: true };
    if (scenario) where.scenario = scenario;
    if (level) where.level = level;
    if (formality) where.formality = formality;

    const [items, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.conversation.count({ where }),
    ]);
    return { items, total, page, limit };
  }

  async findBySlug(slug: string) {
    const conv = await this.prisma.conversation.findUnique({
      where: { slug },
      include: {
        turns: { orderBy: { orderIndex: 'asc' } },
        keyPhrases: true,
      },
    });
    if (!conv) throw new NotFoundException('Conversation not found');
    return conv;
  }

  async getScenarios() {
    const scenarios = await this.prisma.conversation.findMany({
      where: { isPublished: true },
      select: { scenario: true },
      distinct: ['scenario'],
    });
    return scenarios.map((s) => s.scenario);
  }
}
