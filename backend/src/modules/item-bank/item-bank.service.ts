import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ItemBankService {
  constructor(private prisma: PrismaService) {}
  async findAll() { return this.prisma.itemBankItem.findMany({ where: { isActive: true }, include: { exercise: true }, take: 50 }); }
}
