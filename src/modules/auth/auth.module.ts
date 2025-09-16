import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Jwt } from './jwt.service';
import { UserService } from '@modules/user';
import { PasswordService } from '@common/lib';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Jwt, UserService, PasswordService],
})
export class AuthModule {}
