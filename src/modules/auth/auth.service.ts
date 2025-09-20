import { UserService } from '@modules/user';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from '@common/types';
import { PasswordService } from '@common/lib';
import { User } from '@modules/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { TokenService } from '@common/services/token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from './entities/user-token.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from '@common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  /* ========== 🆕 Register operation ========== */
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
    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      role: user.role,
    });

    return { user, tokens };
  }

  /* ========== 📖 Login operation ========== */
  async login(loginDto: LoginDto): Promise<{ user: User; tokens: Tokens }> {
    const foundUser = await this.userService.findByUserName(loginDto.username);
    if (!foundUser) {
      throw new UnauthorizedException('username yoki password xato');
    }

    // Parolni tekshirish
    const isMatch = await this.passwordService.compare(
      loginDto.password,
      foundUser.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('username yoki password xato');
    }

    const tokens = await this.tokenService.generateTokens({
      userId: foundUser.id,
      role: foundUser.role,
    });

    // Database'ga refreshTokenni saqlash
    const userTokenEntity = this.userTokenRepository.create({
      userId: foundUser.id,
      refreshToken: tokens.refreshToken,
    });
    await this.userTokenRepository.save(userTokenEntity);

    return { user: foundUser, tokens };
  }

  /* ==========  Logaut operation ========== */
  async logaut(currentUser: IJwtPayload): Promise<void> {
    const userToken = await this.userTokenRepository.findOneBy({
      userId: currentUser.userId,
      isValid: true,
    });

    if (!userToken) {
      throw new NotFoundException(
        'Foydalanuvchi uchun refresh token topilmadi',
      );
    }

    // Tokenni to'liq o'chirib tashlash
    await this.userTokenRepository.remove(userToken);
  }

  /* ========== ♻️ Refresh token operation ========== */
  async refreshToken(userId: number, oldToken: string): Promise<Tokens> {
    const user = await this.userService.findOne(userId);
    const userToken = await this.userTokenRepository.findOneBy({
      refreshToken: oldToken,
    });

    if (!userToken) {
      throw new UnauthorizedException('Refresh token yaroqsiz yoki eskirgan');
    }

    // Yangi access va refresh token yaratish
    const payload: IJwtPayload = { userId: user.id, role: user.role };
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(payload);

    // Aski tokeni yangilash
    userToken.refreshToken = refreshToken;
    userToken.isValid = true;

    await this.userTokenRepository.save(userToken);

    return { accessToken, refreshToken };
  }
}
