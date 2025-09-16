import { UserService } from '@modules/user';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Jwt } from './jwt.service';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from '@common/types';
import { PasswordService, ResponseData } from '@common/lib';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: Jwt,
    private readonly passwordService: PasswordService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; tokens: Tokens }> {
    // Email bandligini tekshirish
    await this.userService.findByEmail(registerDto.email);

    // Parolni hashlash
    const hashedPassword = await this.passwordService.hash(
      registerDto.password,
    );

    // User yaratish
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Token yaratish
    const tokens = await this.jwt.generateTokens({
      userId: user.id,
      role: user.role,
    });

    // Response qaytarish
    // return new ResponseData<User>({
    //   success: true,
    //   message: "Foydalanuvchi muvaffaqiyatli ro'yhatdan o'tdi",
    //   statusCode: HttpStatus.CREATED,
    //   data: user,
    //   tokens,
    // });

    return { user, tokens };
  }
}
