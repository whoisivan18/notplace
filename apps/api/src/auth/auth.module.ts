import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRateLimitGuard } from './rate-limit.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRateLimitGuard],
  exports: [JwtModule],
})
export class AuthModule {}
