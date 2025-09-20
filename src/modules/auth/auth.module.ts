import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@modules/user';
import { PasswordService } from '@common/lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { TokenService } from '@common/services/token.service';
import { UserToken } from './entities/user-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken, User])],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UserService, PasswordService],
})
export class AuthModule {}
