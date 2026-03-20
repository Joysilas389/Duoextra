import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConversationsService } from './conversations.service';
import { Public } from '../../common/decorators';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly service: ConversationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List conversations with filters' })
  async findAll(
    @Query('scenario') scenario?: string,
    @Query('level') level?: string,
    @Query('formality') formality?: string,
    @Query('page') page?: number,
  ) {
    return this.service.findAll({ scenario, level, formality, page });
  }

  @Get('scenarios')
  @Public()
  @ApiOperation({ summary: 'Get all available scenario categories' })
  async getScenarios() {
    return this.service.getScenarios();
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get conversation by slug with turns and phrases' })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
