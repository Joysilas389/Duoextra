import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiTutorService } from './ai-tutor.service';

@ApiTags('ai-tutor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai-tutor')
export class AiTutorController {
  constructor(private readonly service: AiTutorService) {}
}
