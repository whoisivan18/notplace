import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma.service';
import { Role } from '../rbac/roles';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto, userAgent?: string) {
    const count = await this.prisma.user.count();
    const role = count === 0 ? Role.OWNER : Role.BUYER;
    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        verified: count === 0,
        roles: [role],
      },
    });

    return this.issueSession(user.id, user.roles, userAgent);
  }

  async login(dto: LoginDto, userAgent?: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.login }, { username: dto.login }] },
    });
    if (!user || !(await argon2.verify(user.passwordHash, dto.password))) {
      throw new UnauthorizedException('Неверные учётные данные');
    }
    return this.issueSession(user.id, user.roles, userAgent);
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwt.verifyAsync(refreshToken);
    const session = await this.prisma.session.findUnique({ where: { id: payload.sid } });
    if (!session || session.revokedAt) throw new UnauthorizedException('Сессия недействительна');
    return this.issueTokens(payload.sub, payload.roles, session.id);
  }

  async sessions(userId: string) {
    return this.prisma.session.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async logoutEverywhere(userId: string) {
    return this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async issueSession(userId: string, roles: string[], userAgent?: string) {
    const session = await this.prisma.session.create({
      data: { userId, userAgent: userAgent ?? 'unknown' },
    });
    return this.issueTokens(userId, roles, session.id);
  }

  private async issueTokens(sub: string, roles: string[], sid: string) {
    const payload = { sub, roles, sid };
    return {
      accessToken: await this.jwt.signAsync(payload, { expiresIn: '15m' }),
      refreshToken: await this.jwt.signAsync(payload, { expiresIn: '30d' }),
    };
  }
}
