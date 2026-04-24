import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { ExperienceModule } from './experiences/experience.module';
import { ServiceModule } from './services/service.module';
import { ProjectsModule } from './project/project.module';
import { TestimonialsModule } from './testimonials/testimonial.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    PrismaModule,
    ContactModule,
    ExperienceModule,
    ServiceModule,
    ProjectsModule,
    TestimonialsModule,
  ],
})
export class AppModule {}
