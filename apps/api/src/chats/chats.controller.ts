import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { ContactDetectorService } from '../moderation/contact-detector.service';

@ApiTags('chats')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly detector: ContactDetectorService) {}

  @Post('message/validate')
  validate(@Body() body: { text: string }) {
    return { forbidden: this.detector.containsForbiddenContact(body.text) };
  }
}
