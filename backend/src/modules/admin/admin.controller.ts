import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, CurrentUser } from '../../common/decorators';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Admin dashboard statistics' })
  async getDashboard() {
    return this.service.getDashboardStats();
  }

  @Get('providers')
  @ApiOperation({ summary: 'List exam providers' })
  async getProviders() {
    return this.service.getProviders();
  }

  @Post('providers')
  @ApiOperation({ summary: 'Create exam provider' })
  async createProvider(@Body() data: any) {
    return this.service.createProvider(data);
  }

  @Post('lessons')
  @ApiOperation({ summary: 'Create lesson' })
  async createLesson(@Body() data: any) {
    return this.service.createLesson(data);
  }

  @Put('lessons/:id')
  @ApiOperation({ summary: 'Update lesson' })
  async updateLesson(@Param('id') id: string, @Body() data: any) {
    return this.service.updateLesson(id, data);
  }

  @Post('exercises')
  @ApiOperation({ summary: 'Create exercise' })
  async createExercise(@Body() data: any) {
    return this.service.createExercise(data);
  }

  @Post('content/:entityType/:entityId/publish')
  @ApiOperation({ summary: 'Publish content with versioning' })
  async publishContent(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.publishContent(entityType, entityId, userId);
  }
}
