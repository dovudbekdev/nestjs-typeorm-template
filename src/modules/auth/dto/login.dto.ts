import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ali', description: 'Foydalanuvchining unique nomi' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234', description: 'Foydalanuvchi paroli' })
  @IsString()
  password: string;
}
