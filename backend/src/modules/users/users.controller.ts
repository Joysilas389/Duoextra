import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.service.findById(userId);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get learner dashboard data' })
  async getDashboard(@CurrentUser('sub') userId: string) {
    return this.service.getDashboardData(userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@CurrentUser('sub') userId: string, @Body() data: any) {
    return this.service.updateProfile(userId, data);
  }
}
