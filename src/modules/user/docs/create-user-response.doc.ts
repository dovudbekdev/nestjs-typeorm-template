import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto';
import { HttpStatus } from '@nestjs/common';
import { UserCreatedResponse, UserNotFoundResponse } from './user-response.doc';

export const CreateUserResponseDocs = [
  ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' }),
  ApiBody({ type: CreateUserDto }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Foydalanuvchi yaratilganda',
    type: UserCreatedResponse,
  }),
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Foydalanuvchi ma'lumoti topilmasa",
    type: UserNotFoundResponse,
  }),
];
