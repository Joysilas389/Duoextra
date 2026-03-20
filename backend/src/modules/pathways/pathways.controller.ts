import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PathwaysService } from './pathways.service';

@ApiTags('pathways')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pathways')
export class PathwaysController {
  constructor(private readonly service: PathwaysService) {}
}
