// Nestjs va tashqi kutubxonalar
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  applyDecorators,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Loyiha modullari va local fayllar
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserResponseDocs,
  FindAllUserResponseDocs,
  FindOneUserResponseDocs,
} from './docs';
import { FindAllDto } from '@common/dtos';
import { FindAllOptions } from '@common/types';
import { User } from './entities/user.entity';
import { AppConfigService } from '@config/config.service';
import { ResponseData } from '@common/lib';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post()
  @applyDecorators(...CreateUserResponseDocs)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseData<User>> {
    const createdUser = await this.userService.create(createUserDto);
    return new ResponseData<User>({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
      statusCode: HttpStatus.CREATED,
      data: createdUser,
    });
  }

  @Get()
  @applyDecorators(...FindAllUserResponseDocs)
  async findAll(@Query() query: FindAllDto) {
    const findAllOptions: FindAllOptions<User> = {
      search: query.search,
      searchFields: query.searchFields as (keyof User)[],
      page: query.page,
      limit: this.appConfigService.paginationLimit,
      sort: { field: query.sortField as keyof User, order: query.sortOrder! },
    };
    const { data, meta } = await this.userService.findAll(findAllOptions);
    return new ResponseData<User[]>({
      success: true,
      message: "Foydalanuvchi ma'lumotlari",
      statusCode: HttpStatus.OK,
      data,
      meta,
    });
  }

  @Get(':id')
  @applyDecorators(...FindOneUserResponseDocs)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return new ResponseData<User>({
      success: true,
      message: "Foydalanuvchi ma'lumotlari",
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new ResponseData<User>({
      success: true,
      message: "Foydalanuvchi ma'lumotlari yangilandi",
      statusCode: HttpStatus.OK,
      data: updatedUser,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return new ResponseData<User>({
      success: true,
      message: "Foydalanuvchi ma'lumotlari muvaffaqiyatli o'chirildi",
      statusCode: HttpStatus.OK,
    });
  }
}
