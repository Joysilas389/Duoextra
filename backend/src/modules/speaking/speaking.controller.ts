import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { SpeakingService } from './speaking.service';

@ApiTags('speaking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('speaking')
export class SpeakingController {
  constructor(private readonly service: SpeakingService) {}

  @Get('prompts')
  @ApiOperation({ summary: 'Get speaking prompts' })
  async getPrompts(@Query('level') level?: string, @Query('taskType') taskType?: string) {
    return this.service.getPrompts({ level, taskType });
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit speaking recording' })
  async submit(@CurrentUser('sub') userId: string, @Body() data: { promptId: string; audioUrl: string; duration: number }) {
    return this.service.submitRecording(userId, data);
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Get user speaking submissions' })
  async getSubmissions(@CurrentUser('sub') userId: string) {
    return this.service.getSubmissions(userId);
  }
}
