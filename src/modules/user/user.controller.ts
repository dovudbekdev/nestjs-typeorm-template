// Nestjs va tashqi kutubxonalar
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  applyDecorators,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Loyiha modullari va local fayllar
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDocs, FindAllUserResponseDocs } from './docs';
import { FindAllDto } from '@common/dtos';
import { FindAllOptions } from '@common/types';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @applyDecorators(...CreateUserResponseDocs)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @applyDecorators(...FindAllUserResponseDocs)
  findAll(@Query() query: FindAllDto) {
    const findAllOptions:FindAllOptions<User> = {
      search: query.search,
      searchFields: query.searchFields,
      page: query.page,
      sort
    }
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
