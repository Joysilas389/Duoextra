import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ListeningService {
  constructor(private prisma: PrismaService) {}
}
