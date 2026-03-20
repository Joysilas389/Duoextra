import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(u => u.trim()),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('DuoExtra API')
    .setDescription('German Language Learning & Exam Preparation Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('onboarding', 'Onboarding & placement')
    .addTag('pathways', 'Learning paths')
    .addTag('lessons', 'Lessons & exercises')
    .addTag('listening', 'Listening module')
    .addTag('reading', 'Reading module')
    .addTag('writing', 'Writing module')
    .addTag('speaking', 'Speaking module')
    .addTag('vocabulary', 'Vocabulary & SRS')
    .addTag('grammar', 'Grammar center')
    .addTag('pronunciation', 'Pronunciation drills')
    .addTag('mock-exams', 'Mock exam engine')
    .addTag('analytics', 'Analytics & progress')
    .addTag('gamification', 'XP, badges, streaks')
    .addTag('ai-tutor', 'AI tutor chat')
    .addTag('notifications', 'Notifications')
    .addTag('admin', 'Admin CMS')
    .addTag('institutions', 'Institution management')
    .addTag('subscriptions', 'Subscription management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 DuoExtra API running on port ${port}`);
  console.log(`📚 Swagger docs at /api/docs`);
}

bootstrap();
