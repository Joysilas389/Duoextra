import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PathwaysService } from './pathways.service';

@ApiTags('pathways')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pathways')
export class PathwaysController {
  constructor(private readonly service: PathwaysService) {}

  @Get()
  @ApiOperation({ summary: 'List learning pathways' })
  async findAll(@Query('type') type?: string, @Query('level') level?: string) {
    return this.service.findAll({ type, level });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get pathway by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
