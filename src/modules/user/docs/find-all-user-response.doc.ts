import { HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindAllUserResponse } from './user-response.doc';

export const FindAllUserResponseDocs = [
  ApiOperation({ summary: "Foydalanuvchilar ma'lumotlarini olish" }),
  ApiResponse({
    status: HttpStatus.OK,
    description: "Barch foydalanuvchi ma'lumotlari",
    type: FindAllUserResponse,
  }),
];
