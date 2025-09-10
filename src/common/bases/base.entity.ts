import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ type: 'number', description: 'ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  //   @ApiProperty({
  //     type: 'string',
  //     description: "Ma'lumot qo'shilgan vaqt",
  //     example: Date.now(),
  //   })
  @CreateDateColumn()
  createdAt: Date;

  //   @ApiProperty({
  //     type: 'string',
  //     description: "Ma'lumot o'zgartirilgan vaqt",
  //     example: Date.now(),
  //   })
  @UpdateDateColumn()
  updatedAt: Date;
}
