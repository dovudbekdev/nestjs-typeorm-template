import { registerAs } from '@nestjs/config';

export const cookieConfig = registerAs('cookies', () => ({
  secret: process.env.COOKIE_SECRET || 'secret',
  maxAge: Number(process.env.COOKIE_MAX_AGE) || 7,
  cookieRefreshToken: process.env.COOKIE_REFRESH_TOKEN || 'refreshToken',
  cookieSecure: process.env.COOKIE_SECURE || 'false',
}));
