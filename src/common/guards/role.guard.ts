import { AuthenticationRequest } from '@common/interfaces';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<AuthenticationRequest>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(
        "Foydalanuvchi autentifikatsiyadan o'tmagan",
      );
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(
        'Sizga ushbu amalni bajarish uchun ruxsat berilmagan',
      );
    }

    return true;
  }
}
