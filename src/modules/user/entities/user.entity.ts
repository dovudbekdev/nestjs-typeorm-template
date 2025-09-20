// Nestjs va tashqi kutubxonalar
import { Column, Entity, OneToMany } from 'typeorm';

// Loyiha modullari va local fayllar
import { BaseEntity } from '@common/bases';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@common/enums';
import { UserToken } from '@modules/auth/entities/user-token.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({
    type: 'string',
    description: 'Elektron pochta manzili',
    example: 'dovudbek.dev@gmail.com',
  })
  @Column({ type: 'varchar', unique: true, nullable: true })
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

  @ApiProperty({
    type: 'string',
    description: 'Foydalanuvchiga berilgan role',
    enum: Role,
    example: Role.USER,
  })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  tokens: UserToken[];
}
