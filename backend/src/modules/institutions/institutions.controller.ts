import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InstitutionsService } from './institutions.service';

@ApiTags('institutions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly service: InstitutionsService) {}
}
