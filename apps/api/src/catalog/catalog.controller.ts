import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../common/prisma.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Roles } from '../rbac/roles.decorator';
import { Role } from '../rbac/roles';
import { RolesGuard } from '../rbac/roles.guard';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('games')
  games() {
    return this.prisma.game.findMany({ include: { category: true } });
  }

  @Get('games/:slug')
  game(@Param('slug') slug: string) {
    return this.prisma.game.findUnique({ where: { slug }, include: { listings: true } });
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Post('categories')
  createCategory(@Body() body: { name: string; slug: string }) {
    return this.prisma.category.create({ data: body });
  }
}
