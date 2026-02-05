import { CanActivate, ExecutionContext, Injectable, TooManyRequestsException } from '@nestjs/common';

const WINDOW_MS = 60_000;
const MAX_REQ = 20;
const bucket = new Map<string, number[]>();

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const key = req.ip || 'unknown';
    const now = Date.now();
    const times = (bucket.get(key) || []).filter((t) => now - t < WINDOW_MS);
    if (times.length >= MAX_REQ) throw new TooManyRequestsException('Слишком много попыток авторизации');
    times.push(now);
    bucket.set(key, times);
    return true;
  }
}
