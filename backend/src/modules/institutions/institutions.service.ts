import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}
  async findAll() { return this.prisma.institution.findMany({ where: { isActive: true } }); }
}
