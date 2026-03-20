import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class MockExamService {
  constructor(private prisma: PrismaService) {}

  async getTemplates(filters: { provider?: string; level?: string }) {
    const where: any = { isPublished: true };
    if (filters.provider || filters.level) {
      where.examDefinition = {};
      if (filters.level) where.examDefinition.level = filters.level;
    }
    return this.prisma.mockExamTemplate.findMany({
      where,
      include: { examDefinition: { include: { provider: true } } },
    });
  }

  async startExam(userId: string, templateId: string) {
    const template = await this.prisma.mockExamTemplate.findUnique({
      where: { id: templateId },
      include: { examDefinition: { include: { modules: true } } },
    });
    if (!template) throw new NotFoundException('Mock exam template not found');

    const sections = template.examDefinition.modules.map((mod, i) => ({
      skill: mod.skill,
      name: mod.name,
      orderIndex: i,
    }));

    const attempt = await this.prisma.mockExamAttempt.create({
      data: {
        userId,
        templateId,
        status: 'in_progress',
        sections: { create: sections },
      },
      include: { sections: true },
    });

    return attempt;
  }

  async saveAnswers(attemptId: string, sectionId: string, answers: any) {
    return this.prisma.mockExamSection.update({
      where: { id: sectionId },
      data: { answers },
    });
  }

  async submitExam(attemptId: string) {
    const attempt = await this.prisma.mockExamAttempt.findUnique({
      where: { id: attemptId },
      include: { sections: true },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.status !== 'in_progress') {
      throw new BadRequestException('Exam already submitted');
    }

    // TODO: Score calculation logic
    return this.prisma.mockExamAttempt.update({
      where: { id: attemptId },
      data: { status: 'submitted', completedAt: new Date() },
      include: { sections: true },
    });
  }

  async getResults(userId: string, attemptId: string) {
    return this.prisma.mockExamAttempt.findFirst({
      where: { id: attemptId, userId },
      include: { sections: true, template: { include: { examDefinition: true } } },
    });
  }

  async getHistory(userId: string) {
    return this.prisma.mockExamAttempt.findMany({
      where: { userId },
      include: { template: { include: { examDefinition: true } } },
      orderBy: { startedAt: 'desc' },
    });
  }
}
