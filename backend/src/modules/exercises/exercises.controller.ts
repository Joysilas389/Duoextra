import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { ExercisesService } from './exercises.service';

@ApiTags('exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @Get()
  async findAll(@Query('skill') skill?: string, @Query('level') level?: string) {
    return this.service.findAll({ skill, level });
  }

  @Post(':id/submit')
  async submit(@CurrentUser('sub') userId: string, @Param('id') id: string, @Body('answer') answer: any) {
    return this.service.submitAnswer(userId, id, answer);
  }
}
