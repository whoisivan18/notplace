import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  @Get('health')
  health() {
    return { rubOnly: true, status: 'ok' };
  }
}
