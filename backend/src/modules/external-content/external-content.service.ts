import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ExternalContentService {
  constructor(private prisma: PrismaService) {}
  async findAll() { return this.prisma.externalContentItem.findMany({ where: { isApproved: true } }); }
}
