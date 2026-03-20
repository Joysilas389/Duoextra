import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { OnboardingService } from './onboarding.service';

@ApiTags('onboarding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly service: OnboardingService) {}

  @Post('questionnaire')
  @ApiOperation({ summary: 'Save onboarding questionnaire answers' })
  async saveQuestionnaire(@CurrentUser('sub') userId: string, @Body() data: any) {
    return this.service.saveQuestionnaire(userId, data);
  }

  @Post('placement')
  @ApiOperation({ summary: 'Submit placement test answers' })
  async submitPlacement(@CurrentUser('sub') userId: string, @Body('answers') answers: any[]) {
    return this.service.submitPlacementTest(userId, answers);
  }
}
