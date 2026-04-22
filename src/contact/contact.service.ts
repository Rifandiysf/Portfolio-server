import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateContactDto,
  UpdateContactStatusDto,
  ContactQueryDto,
} from './dto/contact.dto';
import { buildContactEmailHtml } from './template/contact-email.template';

@Injectable()
export class ContactService {
  private resend: Resend;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async create(dto: CreateContactDto) {
    const message = await this.prisma.contactMessage.create({ data: dto });

    // Send notification email
    const toEmail = this.configService.get<string>('RESEND_TO_EMAIL');
    const fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL');

    if (toEmail && fromEmail) {
      try {
        await this.resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `New contact message from ${dto.name}`,
          html: buildContactEmailHtml({
            name: dto.name,
            email: dto.email,
            message: dto.message,
          }),
        });
      } catch (err) {
        console.error('Failed to send email notification:', err);
      }
    }

    return message;
  }

  findAll(query: ContactQueryDto) {
    return this.prisma.contactMessage.findMany({
      where: query.status ? { status: query.status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const msg = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    return msg;
  }

  async updateStatus(id: string, dto: UpdateContactStatusDto) {
    await this.findOne(id);
    return this.prisma.contactMessage.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.contactMessage.delete({ where: { id } });
    return { message: 'Contact message deleted' };
  }
}
