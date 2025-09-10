import { FindOptionsWhere, ObjectLiteral } from 'typeorm';

export type PaginationOptions<Entity extends ObjectLiteral> = {
  page?: number;
  limit?: number;
  where?: FindOptionsWhere<Entity>;
};
