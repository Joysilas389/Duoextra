import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SpeakingService {
  constructor(private prisma: PrismaService) {}

  async getPrompts(filters: { level?: string; taskType?: string }) {
    const where: any = { isPublished: true };
    if (filters.level) where.level = filters.level;
    if (filters.taskType) where.taskType = filters.taskType;

    return this.prisma.speakingPrompt.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async submitRecording(userId: string, data: {
    promptId: string;
    audioUrl: string;
    duration: number;
  }) {
    const submission = await this.prisma.submission.create({
      data: {
        userId,
        type: 'speaking',
        referenceId: data.promptId,
        referenceType: 'speaking_prompt',
        content: { audioUrl: data.audioUrl, duration: data.duration },
        status: 'submitted',
      },
    });
    // TODO: Queue transcription + AI evaluation
    return submission;
  }

  async getSubmissions(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId, type: 'speaking' },
      include: { speakingFeedback: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
