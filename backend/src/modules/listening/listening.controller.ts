import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListeningService } from './listening.service';

@ApiTags('listening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('listening')
export class ListeningController {
  constructor(private readonly service: ListeningService) {}
}
