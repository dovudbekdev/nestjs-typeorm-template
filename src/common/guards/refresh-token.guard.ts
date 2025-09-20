import {
  AuthenticationRequest,
  ICookieConfig,
  IJwtPayload,
} from '@common/interfaces';
import { AppConfigService, TokenService } from '@common/services';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  cookieConfig: ICookieConfig;
  constructor(
    private readonly tokenService: TokenService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.cookieConfig = appConfigService.cookieConfig;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticationRequest>();

    // Tokenni olish (cookie yoki header orqali)
    const token =
      request.cookies[this.cookieConfig.cookieRefreshToken] ||
      this.extractTokenFormHeader(request);

    if (!token) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }

    try {
      // Tokenni tekshirish
      const payload: IJwtPayload = await this.tokenService.verifyToken(
        token,
        'refresh',
      );

      request.user = payload;
      request.refreshToken = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Refresh token yaroqsiz yoki eskirgan');
    }
  }

  private extractTokenFormHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
