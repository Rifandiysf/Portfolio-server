import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonial.controller';
import { TestimonialsService } from './testimonial.service';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
