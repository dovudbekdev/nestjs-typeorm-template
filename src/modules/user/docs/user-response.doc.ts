import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';

export class UserCreatedResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Foydalanuvchi yaratildi' })
  message: string;

  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode: number;

  @ApiProperty({ type: () => User })
  data: User;
}

export class UserNotFoundResponse {
  @ApiProperty({ type: 'boolean', example: false })
  success: boolean;

  @ApiProperty({
    type: 'string',
    example: "Foydalanuvchi ma'lumotlari topilmadi",
  })
  message: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.NOT_FOUND,
    enum: HttpStatus,
  })
  statusCode: number;

  @ApiProperty({ type: 'null', example: null })
  data: null;
}

export class FindAllUserResponse {
  @ApiProperty({ type: 'boolean', example: true })
  success: boolean;

  @ApiProperty({
    type: 'string',
    description: "Foydalanuvchilar ro'yxati",
    example: "Foydalanuvchilar ro'yxati",
  })
  message: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    enum: HttpStatus,
  })
  statusCode: number;

  @ApiProperty({
    type: User,
    isArray: true,
    description: "Foydalanuvchilar ro'yxati",
  })
  data: User[];
}
