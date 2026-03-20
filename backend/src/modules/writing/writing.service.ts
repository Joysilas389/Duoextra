import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class WritingService {
  constructor(private prisma: PrismaService) {}

  async getPrompts(filters: { level?: string; provider?: string; textType?: string }) {
    const where: any = { isPublished: true };
    if (filters.level) where.level = filters.level;
    if (filters.provider) where.provider = filters.provider;
    if (filters.textType) where.textType = filters.textType;

    return this.prisma.writingPrompt.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPromptById(id: string) {
    const prompt = await this.prisma.writingPrompt.findUnique({ where: { id } });
    if (!prompt) throw new NotFoundException('Writing prompt not found');
    return prompt;
  }

  async submitWriting(userId: string, data: {
    promptId: string;
    text: string;
    timeSpent?: number;
  }) {
    const submission = await this.prisma.submission.create({
      data: {
        userId,
        type: 'writing',
        referenceId: data.promptId,
        referenceType: 'writing_prompt',
        content: { text: data.text, timeSpent: data.timeSpent },
        status: 'submitted',
      },
    });

    // TODO: Queue AI evaluation via BullMQ
    // In production, this triggers a background job that calls AI for feedback

    return submission;
  }

  async getSubmissions(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId, type: 'writing' },
      include: { writingFeedback: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFeedback(submissionId: string) {
    return this.prisma.writingFeedback.findMany({
      where: { submissionId },
    });
  }
}
