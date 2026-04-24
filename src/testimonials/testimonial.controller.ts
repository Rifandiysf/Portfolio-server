import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
  UpdateTestimonialVisibilityDto,
} from './dto/testimonial.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnly } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TestimonialsService } from './testimonial.service';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly service: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil testimonial yang sudah di-approve (public)' })
  findPublic() {
    return this.service.findPublic();
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ambil semua testimonial termasuk hidden (admin)' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Submit review/testimonial (public)',
    description:
      'Testimonial default hidden, admin harus approve dulu via PATCH /testimonials/:id/visibility',
  })
  create(@Body() dto: CreateTestimonialDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update isi testimonial (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve / hide testimonial (admin)' })
  updateVisibility(
    @Param('id') id: string,
    @Body() dto: UpdateTestimonialVisibilityDto,
  ) {
    return this.service.updateVisibility(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus testimonial (admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
