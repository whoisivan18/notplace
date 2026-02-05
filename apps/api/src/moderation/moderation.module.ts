import { Module } from '@nestjs/common';
import { ModerationController } from './moderation.controller';
import { ContactDetectorService } from './contact-detector.service';

@Module({ controllers: [ModerationController], providers: [ContactDetectorService], exports: [ContactDetectorService] })
export class ModerationModule {}
