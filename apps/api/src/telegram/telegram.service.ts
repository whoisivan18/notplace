import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TelegramService {
  constructor(private readonly prisma: PrismaService) {}

  async createLinkCode(userId: string) {
    return this.prisma.telegramLink.upsert({
      where: { userId },
      update: { code: randomUUID().slice(0, 8) },
      create: { userId, code: randomUUID().slice(0, 8) },
    });
  }

  async linkByCode(code: string, telegramId: string) {
    return this.prisma.telegramLink.update({
      where: { code },
      data: { telegramId, linkedAt: new Date() },
    });
  }

  async signalNotification(userId: string, type: string) {
    const link = await this.prisma.telegramLink.findUnique({ where: { userId } });
    if (!link?.telegramId) return { delivered: false };
    return { delivered: true, type, signalOnly: true };
  }
}
