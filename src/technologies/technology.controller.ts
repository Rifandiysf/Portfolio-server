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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminOnly } from '../auth/decorators/roles.decorator';
import { TechnologiesService } from './technology.service';
import { TechCategory } from 'prisma/generated/enums';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all technologies (public)' })
  @ApiQuery({ name: 'category', enum: TechCategory, required: false })
  findAll(@Query('category') category?: TechCategory) {
    return this.technologiesService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get technology by id (public)' })
  findOne(@Param('id') id: string) {
    return this.technologiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create technology (admin only)' })
  create(@Body() dto: CreateTechnologyDto) {
    return this.technologiesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update technology (admin only)' })
  update(@Param('id') id: string, @Body() dto: UpdateTechnologyDto) {
    return this.technologiesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete technology (admin only)' })
  remove(@Param('id') id: string) {
    return this.technologiesService.remove(id);
  }
}
