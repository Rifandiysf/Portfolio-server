import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { TechCategory } from 'prisma/generated/enums';

@Injectable()
export class TechnologiesService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: TechCategory) {
    return this.prisma.technology.findMany({
      where: category ? { category } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const tech = await this.prisma.technology.findUnique({ where: { id } });
    if (!tech) throw new NotFoundException('Technology not found');
    return tech;
  }

  create(dto: CreateTechnologyDto) {
    return this.prisma.technology.create({ data: dto });
  }

  async update(id: string, dto: UpdateTechnologyDto) {
    await this.findOne(id);
    return this.prisma.technology.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.technology.delete({ where: { id } });
    return { message: 'Technology deleted' };
  }
}
