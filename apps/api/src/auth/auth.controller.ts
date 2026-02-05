import { Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, RegisterDto } from './dto';
import { JwtGuard } from './jwt.guard';
import { AuthRateLimitGuard } from './rate-limit.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(AuthRateLimitGuard)
  @Post('register')
  register(@Body() dto: RegisterDto, @Headers('user-agent') userAgent?: string) {
    return this.auth.register(dto, userAgent);
  }

  @UseGuards(AuthRateLimitGuard)
  @Post('login')
  login(@Body() dto: LoginDto, @Headers('user-agent') userAgent?: string) {
    return this.auth.login(dto, userAgent);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.auth.refresh(dto.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('sessions')
  sessions(@Req() req: any) {
    return this.auth.sessions(req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout-everywhere')
  logoutEverywhere(@Req() req: any) {
    return this.auth.logoutEverywhere(req.user.sub);
  }
}
