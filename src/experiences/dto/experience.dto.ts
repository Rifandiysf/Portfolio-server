import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsArray, IsInt, IsOptional, Min } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Junior Frontend Developer (Internship)' })
  @IsString()
  role!: string;

  @ApiProperty({ example: 'PT. Walden Global Service' })
  @IsString()
  companyName!: string;

  @ApiProperty({ example: 'July 2025 — November 2025' })
  @IsString()
  date!: string;

  @ApiProperty({ example: '2025' })
  @IsString()
  year!: string;

  @ApiProperty({ example: 'Built a leave management system...' })
  @IsString()
  description!: string;

  @ApiPropertyOptional({ example: ['Next.js', 'TypeScript', 'Tailwind CSS'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];

  @ApiPropertyOptional({ example: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}
