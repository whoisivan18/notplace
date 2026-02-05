import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { TelegramService } from './telegram.service';

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('link-code')
  linkCode(@Req() req: any) {
    return this.telegram.createLinkCode(req.user.sub);
  }

  @Post('start')
  start(@Body() body: { code: string; telegramId: string }) {
    return this.telegram.linkByCode(body.code, body.telegramId);
  }
}
