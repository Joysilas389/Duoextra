import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemBankService } from './item-bank.service';

@ApiTags('item-bank')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('item-bank')
export class ItemBankController {
  constructor(private readonly service: ItemBankService) {}

  @Get()
  async findAll() { return this.service.findAll(); }
}
