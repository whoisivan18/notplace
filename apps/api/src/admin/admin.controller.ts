import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { PrismaService } from '../common/prisma.service';
import { Roles } from '../rbac/roles.decorator';
import { Role } from '../rbac/roles';
import { RolesGuard } from '../rbac/roles.guard';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN, Role.MODERATOR)
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('chats')
  chats() {
    return this.prisma.chat.findMany({ take: 50, orderBy: { updatedAt: 'desc' } });
  }

  @Get('disputes')
  disputes() {
    return this.prisma.dispute.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
  }

  @Post('games')
  async createGame(@Req() req: any, @Body() body: { name: string; slug: string }) {
    const game = await this.prisma.game.create({ data: { ...body, country: 'RU', currency: 'RUB' } });
    await this.audit(req.user.sub, 'CREATE_GAME', game.id);
    return game;
  }

  @Patch('roles')
  async setRoles(@Req() req: any, @Body() body: { userId: string; roles: Role[] }) {
    const user = await this.prisma.user.update({ where: { id: body.userId }, data: { roles: body.roles } });
    await this.audit(req.user.sub, 'SET_ROLES', body.userId);
    return user;
  }

  private audit(moderatorId: string, actionType: string, targetUserId?: string) {
    return this.prisma.moderationAction.create({
      data: {
        moderatorId,
        actionType,
        targetUserId,
        reason: 'admin-panel',
      },
    });
  }
}
