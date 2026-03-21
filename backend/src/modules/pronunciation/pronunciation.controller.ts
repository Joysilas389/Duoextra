import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PronunciationService } from './pronunciation.service';

@ApiTags('pronunciation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pronunciation')
export class PronunciationController {
  constructor(private readonly service: PronunciationService) {}

  @Get('drills')
  async getDrills(@Query('level') level?: string) { return this.service.getDrills(level); }
}
