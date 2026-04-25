import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { TechCategory } from 'prisma/generated/enums';

export class CreateTechnologyDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiProperty({ enum: TechCategory })
  @IsEnum(TechCategory)
  category!: TechCategory;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}
