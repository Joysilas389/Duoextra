import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GrammarService } from './grammar.service';

@ApiTags('grammar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grammar')
export class GrammarController {
  constructor(private readonly service: GrammarService) {}

  @Get()
  @ApiOperation({ summary: 'Get grammar topics' })
  async getTopics(@Query('level') level?: string, @Query('category') category?: string) {
    return this.service.getTopics({ level, category });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get grammar topic detail' })
  async getBySlug(@Param('slug') slug: string) {
    return this.service.getBySlug(slug);
  }
}
