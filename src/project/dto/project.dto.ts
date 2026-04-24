import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsArray, IsInt, IsOptional, IsEnum } from 'class-validator';
import { ProjectStatus } from 'prisma/generated/enums';

export class CreateProjectDto {
  @ApiProperty({ example: 'Sibening' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'sibening' })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({
    example: 'Electronic guidance & counseling system...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  solution?: string;

  @ApiPropertyOptional({ example: '/images/sibening.png' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: ['/images/sibening1.png', '/images/sibening2.png'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  demoUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  repoUrl?: string;

  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({ example: ['Web Development', 'School App'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  statusTags?: string[];

  @ApiPropertyOptional({ example: 2025 })
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: ['Attendance tracking', 'Real-time chat'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional({ example: 0 })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ example: ['tech-uuid-1', 'tech-uuid-2'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologyIds?: string[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class ProjectQueryDto {
  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
