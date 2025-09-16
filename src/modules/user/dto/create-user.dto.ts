import { Role } from '@common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Elektron pochta manzili',
    example: 'dovudbek.dev@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: 'string',
    description: "Foydalanuvchining to'liq isim sharifi",
    example: "O'ktamov Dovudbek",
  })
  @IsOptional()
  full_name?: string;

  @ApiProperty({
    type: 'string',
    description: "Foydalanuvchi username unique bo'lishi kerak",
    example: 'dovudbek',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: 'string', description: 'Parol', example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Foydalanuvchiga berilgan role',
    enum: Role,
    example: Role.USER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
