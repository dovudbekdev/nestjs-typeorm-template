import { JwtPayload, Tokens, TokenType } from '@common/types';
import { AppConfigService } from '@config/config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Jwt {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      // Access token yaratish
      this.jwtService.signAsync(payload, {
        secret: this.appConfigService.jwtConfig.accessTokenSecret,
        expiresIn: this.appConfigService.jwtConfig.accessTokenExpiresIn,
      }),

      //   Refresh token yaratish
      this.jwtService.signAsync(payload, {
        secret: this.appConfigService.jwtConfig.refreshTokenSecret,
        expiresIn: this.appConfigService.jwtConfig.refreshTokenExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  verifyToken(token: string, type: TokenType): Promise<JwtPayload> {
    const secret =
      type === 'access'
        ? this.appConfigService.jwtConfig.accessTokenSecret
        : this.appConfigService.jwtConfig.refreshTokenSecret;

    return this.jwtService.verifyAsync(token, {
      secret: secret,
    });
  }
}
