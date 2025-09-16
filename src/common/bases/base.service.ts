// Nestjs va tashqi kutubxonalar
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { HttpStatus, NotFoundException } from '@nestjs/common';

// Loyihaning xususiy modullari va local fayllar
import { toSkipTake } from '@common/lib';
import { MetaData, ResponseData } from '@common/lib/ResponseData.lib';
import { FindAllOptions } from '@common/types';

export class BaseService<
  Entity extends ObjectLiteral & { id: number },
  CreateDto,
  UpdateDto,
> {
  constructor(
    private readonly repository: Repository<Entity>,
    private readonly entityName: string,
  ) {}

  /* ========== 🆕 Create operation ========== */
  async create(createDto: CreateDto): Promise<Entity> {
    const entity = this.repository.create(createDto as DeepPartial<Entity>);
    const createdEntity = await this.repository.save(entity);
    return createdEntity;
  }

  /* ========== 📖 Read operation ========== */
  async findAll(
    options?: FindAllOptions<Entity>,
  ): Promise<{ data: Entity[]; meta?: MetaData }> {
    const { page, search, searchFields, sort } = options || {};

    const { skip, take } = toSkipTake(page);

    let where: FindOptionsWhere<Entity>[] | undefined = options?.where
      ? [options.where]
      : undefined;

    // Agar search yoki fields bo'lsa ---> search shartlarini qo'shamiz
    if (search && searchFields && searchFields.length > 0) {
      const searchConditions = searchFields.map((filed) => ({
        [filed]: ILike(`%${search}%`),
      })) as FindOptionsWhere<Entity>[];

      where = where ? [...where, ...searchConditions] : searchConditions;
    }

    const [data, total] = await this.repository.findAndCount({
      skip,
      take,
      where,
      order: sort
        ? ({ [sort.field]: sort.order } as FindOptionsOrder<Entity>)
        : undefined,
    });

    let metadata: MetaData | undefined;
    if (page) {
      const totalPages = Math.ceil(total / take!);

      metadata = {
        page: page,
        limit: data.length,
        total,
        totalPages,
        hasNextPage: totalPages > page,
        hasPrevPage: page > 1,
      };
    }

    return { data, meta: metadata };
  }

  async findOne(id: number): Promise<Entity> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
    });

    if (!entity) {
      throw new NotFoundException(`${this.entityName} ma'lumotlari topilmadi`);
    }

    return entity;
  }

  /* ========== ♻️ Update operation ========== */
  async update(id: number, updateDto: UpdateDto): Promise<Entity> {
    const entity = await this.findOne(id);

    const updated = this.repository.merge(
      entity,
      updateDto as DeepPartial<Entity>,
    );

    return this.repository.save(updated);
  }

  /* ========== 🗑️ Delete operation ========== */
  async remove(id: number): Promise<boolean> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return true;
  }
}
