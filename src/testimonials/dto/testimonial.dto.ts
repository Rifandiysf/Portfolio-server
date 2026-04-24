import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Budi Santoso' })
  @IsString()
  authorName!: string;

  @ApiPropertyOptional({ example: 'CTO at PT. Walden Global Service' })
  @IsString()
  @IsOptional()
  authorRole?: string;

  @ApiPropertyOptional({ example: 'https://...' })
  @IsString()
  @IsOptional()
  authorPhoto?: string;

  @ApiProperty({ example: 'Rifandi is an excellent developer...' })
  @IsString()
  content!: string;
}

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}

export class UpdateTestimonialVisibilityDto {
  @ApiProperty()
  @IsBoolean()
  isVisible!: boolean;
}
