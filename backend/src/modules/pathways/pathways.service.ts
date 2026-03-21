import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PathwaysService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any = {}) {
    const where: any = { isPublished: true };
    if (filters.type) where.type = filters.type;
    if (filters.level) where.level = filters.level;
    if (filters.skill) where.skill = filters.skill;
    return this.prisma.pathway.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      include: { units: { orderBy: { orderIndex: 'asc' }, include: { lessons: { where: { isPublished: true }, orderBy: { orderIndex: 'asc' } } } } },
    });
  }

  async findBySlug(slug: string) {
    const pathway = await this.prisma.pathway.findUnique({
      where: { slug },
      include: { units: { orderBy: { orderIndex: 'asc' }, include: { lessons: { where: { isPublished: true }, orderBy: { orderIndex: 'asc' } } } } },
    });
    if (!pathway) throw new NotFoundException('Pathway not found');
    return pathway;
  }
}
