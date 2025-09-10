// Nestjs va tashqi kutubxonalar
import { Column, Entity } from 'typeorm';

// Loyiha modullari va local fayllar
import { BaseEntity } from '@common/bases';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({
    type: 'string',
    description: 'Elektron pochta manzili',
    example: 'dovudbek.dev@gmail.com',
  })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiPropertyOptional({
    type: 'string',
    description: "Foydalanuvchining to'liq isim sharifi",
    example: "O'ktamov Dovudbek",
  })
  @Column({ type: 'varchar', nullable: true, default: null })
  full_name: string;

  @ApiProperty({
    type: 'string',
    description: "Foydalanuvchi username unique bo'lishi kerak",
    example: 'dovudbek',
  })
  @Column({ type: 'varchar', unique: true })
  username: string;

//   @ApiProperty({ type: 'string', description: 'Parol', example: '1234' })
  @Column({ type: 'text' })
  password: string;
}
