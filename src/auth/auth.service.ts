import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { User } from 'prisma/generated/client';
import { Resend } from 'resend';
import { buildResetPasswordEmailHtml } from './templates/reset-password-email.template';

export interface AuthTokenResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl: string | null;
  };
}

@Injectable()
export class AuthService {
  private resend: Resend;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.resend = new Resend(this.configService.getOrThrow('RESEND_API_KEY'));
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user);
  }

  async findOrCreateGoogleUser(data: {
    email: string;
    name: string;
    avatarUrl?: string;
    providerId: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Account not found. Contact administrator.',
      );
    }

    if (!user?.providerId) {
      return this.prisma.user.update({
        where: { id: user?.id },
        data: {
          provider: 'google',
          providerId: data.providerId,
          avatarUrl: user?.avatarUrl ?? data.avatarUrl,
        },
      });
    }

    return user;
  }

  googleCallback(user: User): AuthTokenResponse {
    return this.generateTokens(user);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        message:
          'If the email is registered, a password reset link will be sent to your inbox.',
      };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? '';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
    const fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL') ?? '';

    await this.resend.emails.send({
      from: fromEmail,
      to: user.email,
      subject: 'Reset Password Portfolio Admin',
      html: buildResetPasswordEmailHtml({
        name: user.name,
        resetUrl,
      }),
    });

    return {
      message:
        'If the email is registered, a password reset link will be sent to your inbox.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException(
        'The token is invalid or has expired. Please request a password reset again.',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password changed successfully. Please log in again.' };
  }

  generateTokens(user: User): AuthTokenResponse {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN') ?? '7d',
    });
    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
    });
  }
}
