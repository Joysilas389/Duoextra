import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { AiTutorService } from './ai-tutor.service';

@ApiTags('ai-tutor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai-tutor')
export class AiTutorController {
  constructor(private readonly service: AiTutorService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get user AI conversations' })
  async getConversations(@CurrentUser('sub') userId: string) {
    return this.service.getConversations(userId);
  }

  @Post('conversations')
  @ApiOperation({ summary: 'Create new AI conversation' })
  async create(@CurrentUser('sub') userId: string, @Body('mode') mode: string) {
    return this.service.createConversation(userId, mode);
  }

  @Post('conversations/:id/message')
  @ApiOperation({ summary: 'Send message to AI tutor' })
  async sendMessage(@CurrentUser('sub') userId: string, @Param('id') id: string, @Body('message') message: string) {
    return this.service.sendMessage(userId, id, message);
  }
}
