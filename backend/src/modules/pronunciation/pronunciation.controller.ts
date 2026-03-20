import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PronunciationService } from './pronunciation.service';

@ApiTags('pronunciation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pronunciation')
export class PronunciationController {
  constructor(private readonly service: PronunciationService) {}
}
