import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { Role } from 'prisma/generated/enums';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

export class UpdateUserRoleDto {
  @ApiPropertyOptional({ enum: Role })
  @IsEnum(Role)
  role!: Role;
}
