import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../common/prisma.service';
import { JwtGuard } from '../auth/jwt.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.prisma.user.findUnique({ where: { id: req.user.sub } });
  }
}
