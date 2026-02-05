import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { PrismaService } from '../common/prisma.service';

@ApiTags('listings')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('listings')
export class ListingsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() body: { gameId: string; title: string; description: string; priceRub: number; warningText?: string; itemType: string },
  ) {
    if (body.itemType === 'ACCOUNT' && !body.warningText?.includes('риск санкций')) {
      throw new Error('Для аккаунтов обязательное предупреждение о рисках санкций игры');
    }
    return this.prisma.listing.create({
      data: {
        sellerId: req.user.sub,
        gameId: body.gameId,
        title: body.title,
        description: body.description,
        priceRub: body.priceRub,
        slaPreset: '1h',
        guaranteePreset: 'delivery',
        warningText: body.warningText,
      },
    });
  }
}
