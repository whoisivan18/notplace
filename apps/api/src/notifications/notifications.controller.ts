import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { PrismaService } from '../common/prisma.service';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@Req() req: any) {
    return this.prisma.notification.findMany({ where: { userId: req.user.sub }, orderBy: { createdAt: 'desc' } });
  }
}
