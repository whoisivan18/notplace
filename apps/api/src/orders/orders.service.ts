import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../common/prisma.service';
import { transitionOrderStatus, OrderStatus } from './order-state';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async applyEvent(orderId: string, event: string) {
    const order = await this.prisma.order.findUniqueOrThrow({ where: { id: orderId } });
    const next = transitionOrderStatus(order.status as OrderStatus, event);
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: next,
        events: { create: { eventType: event, payload: {} } },
      },
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleTimers() {
    const now = new Date();
    const waitingBuyerData = await this.prisma.order.findMany({
      where: { status: OrderStatus.PAID_WAITING_BUYER_DATA, buyerDataDeadline: { lt: now } },
    });
    for (const order of waitingBuyerData) await this.applyEvent(order.id, 'TIMEOUT_5M');

    const pendingConfirm = await this.prisma.order.findMany({
      where: { status: OrderStatus.DELIVERED_PENDING_CONFIRMATION, confirmationDeadline: { lt: now } },
    });
    for (const order of pendingConfirm) await this.applyEvent(order.id, 'TIMEOUT_2H');
  }
}
