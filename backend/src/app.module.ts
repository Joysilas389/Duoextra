import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { PathwaysModule } from './modules/pathways/pathways.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ItemBankModule } from './modules/item-bank/item-bank.module';
import { ListeningModule } from './modules/listening/listening.module';
import { ReadingModule } from './modules/reading/reading.module';
import { WritingModule } from './modules/writing/writing.module';
import { SpeakingModule } from './modules/speaking/speaking.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { GrammarModule } from './modules/grammar/grammar.module';
import { PronunciationModule } from './modules/pronunciation/pronunciation.module';
import { MockExamModule } from './modules/mock-exam/mock-exam.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AiTutorModule } from './modules/ai-tutor/ai-tutor.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { AdminModule } from './modules/admin/admin.module';
import { MediaModule } from './modules/media/media.module';
import { ExternalContentModule } from './modules/external-content/external-content.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_URL
          ? new URL(process.env.REDIS_URL).hostname
          : 'localhost',
        port: process.env.REDIS_URL
          ? parseInt(new URL(process.env.REDIS_URL).port)
          : 6379,
      },
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    OnboardingModule,
    PathwaysModule,
    LessonsModule,
    ExercisesModule,
    ItemBankModule,
    ListeningModule,
    ReadingModule,
    WritingModule,
    SpeakingModule,
    VocabularyModule,
    GrammarModule,
    PronunciationModule,
    MockExamModule,
    AnalyticsModule,
    GamificationModule,
    AiTutorModule,
    NotificationsModule,
    SubscriptionsModule,
    InstitutionsModule,
    AdminModule,
    MediaModule,
    ExternalContentModule,
    ConversationsModule,
    AuditModule,
  ],
})
export class AppModule {}
