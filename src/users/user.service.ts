import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/user.dto';

const SELECT_USER = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatarUrl: true,
  bio: true,
  provider: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ select: SELECT_USER });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: SELECT_USER,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: SELECT_USER,
    });
  }

  async updateRole(id: string, dto: UpdateUserRoleDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { role: dto.role },
      select: SELECT_USER,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }
}
