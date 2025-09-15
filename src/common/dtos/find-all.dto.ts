import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindAllDto {
  @ApiPropertyOptional({ description: "Qidiruv so'zi" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Qaysi maydonlardan qidirishi (array ko'rinishida)",
    example: ['username', 'email'],
    type: [String],
  })
  @IsOptional()
  searchFields?: string[];

  @ApiPropertyOptional({ description: 'Sahifa raqami', example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Saralash maydoni',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiPropertyOptional({
    description: 'Saralash tartibi',
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  sortOrder?: 'ASC' | 'DESC';
}
