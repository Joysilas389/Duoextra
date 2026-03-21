import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getSubscription(userId: string) {
    return this.prisma.subscription.findUnique({ where: { userId } });
  }

  async getPlans() {
    return [
      { id: 'FREE', name: 'Free', price: 0, features: ['Basic lessons', 'Limited exercises', 'Vocabulary SRS'] },
      { id: 'PREMIUM_MONTHLY', name: 'Premium Monthly', price: 9.99, features: ['All lessons', 'Unlimited exercises', 'AI tutor', 'Mock exams', 'Writing feedback', 'Speaking feedback'] },
      { id: 'PREMIUM_YEARLY', name: 'Premium Yearly', price: 79.99, features: ['Everything in Premium', 'Save 33%', 'Priority support'] },
    ];
  }
}
