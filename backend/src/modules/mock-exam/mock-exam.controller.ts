import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { MockExamService } from './mock-exam.service';

@ApiTags('mock-exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mock-exams')
export class MockExamController {
  constructor(private readonly service: MockExamService) {}

  @Get('templates')
  @ApiOperation({ summary: 'Get available mock exam templates' })
  async getTemplates(@Query('provider') provider?: string, @Query('level') level?: string) {
    return this.service.getTemplates({ provider, level });
  }

  @Post('start/:templateId')
  @ApiOperation({ summary: 'Start a new mock exam attempt' })
  async start(@CurrentUser('sub') userId: string, @Param('templateId') templateId: string) {
    return this.service.startExam(userId, templateId);
  }

  @Put(':attemptId/sections/:sectionId')
  @ApiOperation({ summary: 'Save section answers (auto-save)' })
  async saveAnswers(@Param('attemptId') attemptId: string, @Param('sectionId') sectionId: string, @Body('answers') answers: any) {
    return this.service.saveAnswers(attemptId, sectionId, answers);
  }

  @Post(':attemptId/submit')
  @ApiOperation({ summary: 'Submit mock exam for scoring' })
  async submit(@Param('attemptId') attemptId: string) {
    return this.service.submitExam(attemptId);
  }

  @Get(':attemptId/results')
  @ApiOperation({ summary: 'Get mock exam results' })
  async getResults(@CurrentUser('sub') userId: string, @Param('attemptId') attemptId: string) {
    return this.service.getResults(userId, attemptId);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get user mock exam history' })
  async getHistory(@CurrentUser('sub') userId: string) {
    return this.service.getHistory(userId);
  }
}
