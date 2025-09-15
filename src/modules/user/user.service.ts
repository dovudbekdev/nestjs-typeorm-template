import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '@common/bases';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseData } from '@common/lib/ResponseData.lib';
import { FindAllOptions } from '@common/types';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository, 'Foydalanuvchi');
  }

  findAll(
    options?: FindAllOptions<User> | undefined,
  ): Promise<ResponseData<User[]>> {
    return super.findAll(options);
  }
}
