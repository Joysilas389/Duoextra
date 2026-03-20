import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { VocabularyService } from './vocabulary.service';

@ApiTags('vocabulary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly service: VocabularyService) {}

  @Get('items')
  @ApiOperation({ summary: 'Get vocabulary items by CEFR level' })
  @ApiQuery({ name: 'level', required: true })
  @ApiQuery({ name: 'page', required: false })
  async getItems(@Query('level') level: string, @Query('page') page?: number) {
    return this.service.getItemsByLevel(level, page);
  }

  @Get('reviews/due')
  @ApiOperation({ summary: 'Get vocabulary items due for review (SRS)' })
  async getDueReviews(@CurrentUser('sub') userId: string) {
    return this.service.getDueReviews(userId);
  }

  @Post('reviews/:vocabId')
  @ApiOperation({ summary: 'Submit a vocabulary review result' })
  async submitReview(
    @CurrentUser('sub') userId: string,
    @Param('vocabId') vocabId: string,
    @Body('quality') quality: number,
  ) {
    return this.service.submitReview(userId, vocabId, quality);
  }

  @Post('saved/:vocabId')
  @ApiOperation({ summary: 'Save a word to personal list' })
  async saveWord(
    @CurrentUser('sub') userId: string,
    @Param('vocabId') vocabId: string,
    @Body('source') source?: string,
  ) {
    return this.service.saveWord(userId, vocabId, source);
  }

  @Get('saved')
  @ApiOperation({ summary: 'Get saved words list' })
  async getSaved(@CurrentUser('sub') userId: string) {
    return this.service.getSavedWords(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get vocabulary learning statistics' })
  async getStats(@CurrentUser('sub') userId: string) {
    return this.service.getStats(userId);
  }
}
