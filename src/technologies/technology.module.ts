import { Module } from '@nestjs/common';
import { TechnologiesController } from './technology.controller';
import { TechnologiesService } from './technology.service';

@Module({
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}
