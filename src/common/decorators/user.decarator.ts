import { AuthenticationRequest, IJwtPayload } from '@common/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticationRequest>();
    const user = request.user;

    // Agar User('role') deb ishlatilsa user.role qaytaradi
    return data ? user?.[data] : user;
  },
);
