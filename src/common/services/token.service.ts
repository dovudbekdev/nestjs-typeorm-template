import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from './config.service';
import { Tokens, TokenType } from '@common/types';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ICookieConfig, IJwtPayload, ITokneConfig } from '@common/interfaces';

@Injectable()
export class TokenService {
  cookieConfig: ICookieConfig;
  tokenConfig: ITokneConfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.tokenConfig = appConfigService.tokenConfig;
    this.cookieConfig = appConfigService.cookieConfig;
  }

  async generateTokens(payload: IJwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      // Access token yaratish
      this.jwtService.signAsync(payload, {
        secret: this.tokenConfig.accessTokenSecret,
        expiresIn: this.tokenConfig.accessTokenExpiresIn,
      }),

      // Refresh token yaratish
      this.jwtService.signAsync(payload, {
        secret: this.tokenConfig.refreshTokenSecret,
        expiresIn: this.tokenConfig.refreshTokenExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string, type: TokenType): Promise<IJwtPayload> {
    const secret =
      type === 'access'
        ? this.tokenConfig.accessTokenSecret
        : this.tokenConfig.refreshTokenSecret;

    return this.jwtService.verifyAsync(token, { secret });
  }

  async saveRefreshToken(response: Response, token: string) {
    // Tokenni cookie'ga saqlash
    response.cookie(this.cookieConfig.cookieRefreshToken, token, {
      httpOnly: true,
      secure: this.cookieConfig.cookieSecure === 'true',
      maxAge: this.cookieConfig.maxAge * 24 * 60 * 60 * 1000,
    });
  }

  async clearRefreshToken(response: Response) {
    response.clearCookie(this.cookieConfig.cookieRefreshToken, {
      httpOnly: true,
      secure: this.cookieConfig.cookieSecure === 'true',
    });
  }
}
