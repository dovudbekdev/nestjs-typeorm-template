import { HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllUserResponse, FindOneUserResponse } from './user-response.doc';

export const FindAllUserResponseDocs = [
  ApiOperation({ summary: "Foydalanuvchilar ma'lumotlarini olish" }),
  ApiResponse({
    status: HttpStatus.OK,
    description: "Barch foydalanuvchi ma'lumotlari",
    type: FindAllUserResponse,
  }),
];

export const FindOneUserResponseDocs = [
  ApiOperation({ summary: "Bitta foydalanuvchi ma'lumotlarini olish" }),
  ApiResponse({
    status: HttpStatus.OK,
    description: "Bitta foydalanuvchi ma'lumoti",
    type: FindOneUserResponse,
  }),
];
