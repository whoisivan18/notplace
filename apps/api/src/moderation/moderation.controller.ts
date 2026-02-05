import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('moderation')
@Controller('moderation')
export class ModerationController {
  @Get()
  index() {
    return { module: 'moderation', status: 'mvp' };
  }
}
