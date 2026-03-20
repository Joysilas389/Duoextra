import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { LessonsService } from './lessons.service';

@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'List lessons with filters' })
  async findAll(
    @Query('skill') skill?: string,
    @Query('level') level?: string,
    @Query('type') type?: string,
    @Query('page') page?: number,
  ) {
    return this.service.findAll({ skill, level, type, page });
  }

  @Get('next-recommended')
  @ApiOperation({ summary: 'Get next recommended lesson for user' })
  async getNext(@CurrentUser('sub') userId: string) {
    return this.service.getNextRecommended(userId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get lesson by slug with steps and exercises' })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark lesson as complete' })
  async complete(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() data: { accuracy: number; timeSpent: number; xpEarned: number },
  ) {
    return this.service.completeLesson(userId, id, data);
  }
}
