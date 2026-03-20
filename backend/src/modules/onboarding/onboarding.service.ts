import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async saveQuestionnaire(userId: string, data: {
    nativeLanguage?: string;
    germanExperience?: string;
    learningPurpose?: string;
    examProvider?: string;
    targetLevel?: string;
    targetExamDate?: string;
    dailyGoalMinutes?: number;
  }) {
    return this.prisma.onboardingResult.upsert({
      where: { userId },
      update: { ...data, questionnaireData: data as any },
      create: {
        userId,
        ...data,
        targetLevel: data.targetLevel as any,
        questionnaireData: data as any,
      },
    });
  }

  async submitPlacementTest(userId: string, answers: { exerciseId: string; answer: any }[]) {
    // Simple scoring: percentage correct → CEFR level mapping
    // In production, use IRT or adaptive algorithm
    const exercises = await this.prisma.exercise.findMany({
      where: { id: { in: answers.map((a) => a.exerciseId) } },
    });

    let correct = 0;
    for (const ans of answers) {
      const ex = exercises.find((e) => e.id === ans.exerciseId);
      if (ex && JSON.stringify(ex.answerKey) === JSON.stringify(ans.answer)) {
        correct++;
      }
    }

    const score = answers.length > 0 ? correct / answers.length : 0;
    const level = this.scoreToLevel(score);

    await this.prisma.onboardingResult.update({
      where: { userId },
      data: {
        placementScore: score,
        placementLevel: level,
        completedAt: new Date(),
      },
    });

    // Update user profile
    await this.prisma.userProfile.update({
      where: { userId },
      data: { currentLevel: level },
    });

    return { score, level, correct, total: answers.length };
  }

  private scoreToLevel(score: number): any {
    if (score >= 0.9) return 'C2';
    if (score >= 0.8) return 'C1';
    if (score >= 0.65) return 'B2';
    if (score >= 0.5) return 'B1';
    if (score >= 0.3) return 'A2';
    return 'A1';
  }
}
