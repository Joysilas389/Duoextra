import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { WritingService } from './writing.service';

@ApiTags('writing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('writing')
export class WritingController {
  constructor(private readonly service: WritingService) {}

  @Get('prompts')
  @ApiOperation({ summary: 'Get writing prompts' })
  async getPrompts(@Query('level') level?: string, @Query('textType') textType?: string) {
    return this.service.getPrompts({ level, textType });
  }

  @Get('prompts/:id')
  @ApiOperation({ summary: 'Get single writing prompt' })
  async getPrompt(@Param('id') id: string) {
    return this.service.getPromptById(id);
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit writing for AI evaluation' })
  async submit(@CurrentUser('sub') userId: string, @Body() data: { promptId: string; text: string; timeSpent?: number }) {
    return this.service.submitWriting(userId, data);
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Get user writing submissions' })
  async getSubmissions(@CurrentUser('sub') userId: string) {
    return this.service.getSubmissions(userId);
  }

  @Get('feedback/:submissionId')
  @ApiOperation({ summary: 'Get feedback for a submission' })
  async getFeedback(@Param('submissionId') submissionId: string) {
    return this.service.getFeedback(submissionId);
  }
}
