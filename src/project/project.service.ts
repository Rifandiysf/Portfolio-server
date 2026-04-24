import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  private includeRelations = {
    technologies: { include: { technology: true } },
  };

  findAll(query: ProjectQueryDto = {}) {
    return this.prisma.project.findMany({
      where: query.status ? { status: query.status } : {},
      include: this.includeRelations,
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: this.includeRelations,
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    const { technologyIds, ...data } = dto;
    return this.prisma.project.create({
      data: {
        ...data,
        technologies: technologyIds?.length
          ? { create: technologyIds.map((id) => ({ technologyId: id })) }
          : undefined,
      },
      include: this.includeRelations,
    });
  }

  async update(slug: string, dto: UpdateProjectDto) {
    const project = await this.findBySlug(slug);
    const { technologyIds, ...data } = dto;

    if (technologyIds !== undefined) {
      await this.prisma.projectTechnology.deleteMany({
        where: { projectId: project.id },
      });
    }

    return this.prisma.project.update({
      where: { id: project.id },
      data: {
        ...data,
        technologies: technologyIds?.length
          ? { create: technologyIds.map((id) => ({ technologyId: id })) }
          : undefined,
      },
      include: this.includeRelations,
    });
  }

  async remove(slug: string) {
    const project = await this.findBySlug(slug);
    return this.prisma.project.delete({ where: { id: project.id } });
  }
}
