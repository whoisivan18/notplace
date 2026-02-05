import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { PrismaService } from '../common/prisma.service';

@ApiTags('disputes')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('disputes')
export class DisputesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  create(@Body() body: { orderId: string; reason: string }) {
    return this.prisma.dispute.create({
      data: {
        orderId: body.orderId,
        reason: body.reason,
        status: 'OPEN',
        sellerReplyDue: new Date(Date.now() + 24 * 60 * 60 * 1000),
        buyerVideoDue: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
}
