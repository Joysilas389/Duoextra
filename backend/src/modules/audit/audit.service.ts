import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async findAll() { return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }); }
  async log(action: string, userId?: string) { return this.prisma.auditLog.create({ data: { action, userId } }); }
}
