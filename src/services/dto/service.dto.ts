import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: '01' })
  @IsString()
  num!: string;

  @ApiProperty({ example: 'Frontend Development' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Building clean, responsive interfaces...' })
  @IsString()
  desc!: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  order!: number;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
