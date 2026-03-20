import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExternalContentService } from './external-content.service';

@ApiTags('external-content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('external-content')
export class ExternalContentController {
  constructor(private readonly service: ExternalContentService) {}
}
