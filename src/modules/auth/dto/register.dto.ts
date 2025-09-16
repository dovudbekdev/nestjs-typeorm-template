import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'ali', description: 'Foydalanuvchining unique nomi' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'ali@gmail.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'Foydalanuvchi paroli' })
  @IsString()
  password: string;
}
