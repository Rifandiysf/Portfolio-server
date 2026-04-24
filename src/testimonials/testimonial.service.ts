import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
  UpdateTestimonialVisibilityDto,
} from './dto/testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findPublic() {
    return this.prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll() {
    return this.prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const t = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Testimonial not found');
    return t;
  }

  create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: { ...dto, isVisible: false },
    });
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async updateVisibility(id: string, dto: UpdateTestimonialVisibilityDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({
      where: { id },
      data: { isVisible: dto.isVisible },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
