import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any = {}) {
    const where: any = { isPublished: true };
    if (filters.skill) where.skill = filters.skill;
    if (filters.level) where.level = filters.level;
    if (filters.type) where.type = filters.type;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const [items, total] = await Promise.all([
      this.prisma.exercise.findMany({ where, skip: (page - 1) * limit, take: limit }),
      this.prisma.exercise.count({ where }),
    ]);
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const ex = await this.prisma.exercise.findUnique({ where: { id } });
    if (!ex) throw new NotFoundException('Exercise not found');
    return ex;
  }

  async submitAnswer(userId: string, exerciseId: string, answer: any) {
    const exercise = await this.prisma.exercise.findUnique({ where: { id: exerciseId } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    const isCorrect = JSON.stringify(exercise.answerKey) === JSON.stringify(answer);
    const submission = await this.prisma.submission.create({
      data: { userId, type: 'exercise', referenceId: exerciseId, referenceType: 'exercise',
        content: { answer }, score: isCorrect ? exercise.xpValue : 0, status: 'graded' },
    });
    if (isCorrect) {
      await this.prisma.progressRecord.create({
        data: { userId, type: 'exercise_correct', xpEarned: exercise.xpValue, skill: exercise.skill },
      });
    } else {
      await this.prisma.mistakeEntry.create({
        data: { userId, category: exercise.skill?.toLowerCase() || 'grammar', exerciseId,
          question: exercise.prompt, userAnswer: JSON.stringify(answer),
          correctAnswer: JSON.stringify(exercise.answerKey), explanation: exercise.explanation },
      });
    }
    return { isCorrect, correctAnswer: isCorrect ? undefined : exercise.answerKey,
      explanation: exercise.explanation, xpEarned: isCorrect ? exercise.xpValue : 0 };
  }
}
