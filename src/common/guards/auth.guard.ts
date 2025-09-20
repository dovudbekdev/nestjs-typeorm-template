import { IS_PUBLIC_KEY } from '@common/decorators';
import { AuthenticationRequest } from '@common/interfaces';
import { TokenService } from '@common/services';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Agar route `@Public()` deb belgilangan bo‘lsa, guardni chetlab o‘tamiz
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<AuthenticationRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token topilmadi');
    }

    try {
      const payload = await this.tokenService.verifyToken(token, 'access');

      // Payloadni request.user ga joylaymiz
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Token yaroqsiz yoki muddati tugagan');
    }
    return true;
  }

  /**
   * Authorization headerdan Bearer tokenni ajratib oluvchi yordamchi funksiya
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
