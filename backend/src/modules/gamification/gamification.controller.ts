import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { GamificationService } from './gamification.service';

@ApiTags('gamification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly service: GamificationService) {}

  @Get('badges')
  @ApiOperation({ summary: 'Get user earned badges' })
  async getBadges(@CurrentUser('sub') userId: string) {
    return this.service.getBadges(userId);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get XP leaderboard' })
  async getLeaderboard() {
    return this.service.getLeaderboard();
  }
}
