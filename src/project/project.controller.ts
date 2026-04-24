import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from './dto/project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminOnly } from '../auth/decorators/roles.decorator';
import { ProjectsService } from './project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects (public)' })
  findAll(@Query() query: ProjectQueryDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get project by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create project (admin only)' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project (admin only)' })
  update(@Param('slug') slug: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (admin only)' })
  remove(@Param('slug') slug: string) {
    return this.projectsService.remove(slug);
  }
}
