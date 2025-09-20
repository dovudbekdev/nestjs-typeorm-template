// Nestjs va tashqi kutubxonlar
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Loyiha modullari va local fayllar
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '@common/bases';
import { User } from './entities/user.entity';
import { FindAllOptions } from '@common/types';
import { MetaData, PasswordService, ResponseData } from '@common/lib';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository, 'Foydalanuvchi');
  }

  /* ========== 🆕 Create operation ========== */
  async create(createDto: CreateUserDto): Promise<User> {
    const foundUser = await this.findByUserName(createDto.username);
    if (foundUser) {
      throw new ConflictException(
        'Bunday usernam orqali foydalanuvchi yaratilgan',
      );
    }

    const hashedPassword = await this.passwordService.hash(createDto.password);

    return super.create({ ...createDto, password: hashedPassword });
  }

  /* ========== 📖 Read operation ========== */
  findAll(
    options?: FindAllOptions<User> | undefined,
  ): Promise<{ data: User[]; meta?: MetaData }> {
    return super.findAll(options);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException('Bu email bilan foydalanuvchi mavjud');
    }

    return user;
  }

  findByUserName(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  /* ========== ♻️ Update operation ========== */
  async update(id: number, updateDto: UpdateUserDto): Promise<User> {
    // Agar password yangilanayotgan bo'lsa, uni hash qilamiz
    if (updateDto.password) {
      updateDto.password = await this.passwordService.hash(updateDto.password);
    }

    // BaseService update'ni chaqiramiz
    return super.update(id, updateDto);
  }
}
