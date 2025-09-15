import { FindOptionsWhere, ObjectLiteral } from 'typeorm';

export type FindAllOptions<Entity extends ObjectLiteral> = {
  search?: string; // umumiy qidiruv
  searchFields?: (keyof Entity)[]; // qaysi ustunlarda qidirish
  page?: number;
  limit?: number;
  sort?: { field: keyof Entity; order: 'ASC' | 'DESC' };
  where?: FindOptionsWhere<Entity>;
};
