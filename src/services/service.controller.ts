import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { Service } from 'prisma/generated/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminOnly } from 'src/auth/decorators/roles.decorator';
import { CreateServiceDto } from './dto/service.dto';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua service (public)' })
  findAll(): Promise<Service[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil service by ID (public)' })
  findOne(@Param('id') id: string): Promise<Service> {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah service baru' })
  create(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service' })
  update(@Param('id') id: string, @Body() dto: CreateServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus service' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
