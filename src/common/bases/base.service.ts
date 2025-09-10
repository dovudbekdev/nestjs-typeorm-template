// Nestjs va tashqi kutubxonalar
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

// Loyihaning xususiy modullari va local fayllar
import { toSkipTake } from '@common/lib';
import { MetaData, ResponseData } from '@common/lib/ResponseData.lib';
import { PaginationOptions } from '@common/types';
import { HttpStatus, NotFoundException } from '@nestjs/common';

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
  async create(createDto: CreateDto): Promise<ResponseData<Entity>> {
    const entity = this.repository.create(createDto as DeepPartial<Entity>);

    const createdEntity = await this.repository.save(entity);

    const response = new ResponseData<Entity>({
      success: true,
      message: `Yangi ${this.entityName.toLowerCase()} muvaffaqiyatli yaratildi`,
      statusCode: HttpStatus.CREATED,
      data: createdEntity,
    });
    return response;
  }

  /* ========== 📖 Read operation ========== */
  async findAll(
    options?: PaginationOptions<Entity>,
  ): Promise<ResponseData<Entity[]>> {
    const { skip, take } = toSkipTake(options?.page, options?.limit);
    const [data, total] = await this.repository.findAndCount({
      skip,
      take,
      where: options?.where,
    });

    const totalPages = Math.ceil(total / take);

    let metadata: MetaData | undefined;
    if (options?.page) {
      metadata = {
        page: options.page,
        limit: data.length,
        total,
        totalPages,
        hasNextPage: totalPages > options.page,
        hasPrevPage: options.page > 1,
      };
    }

    const response = new ResponseData<Entity[]>({
      success: true,
      message: `${this.entityName}lar ro'yxati`,
      statusCode: HttpStatus.OK,
      data: data,
      meta: metadata,
    });

    return response;
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
    });

    if (!entity) {
      throw new NotFoundException(`${this.entityName} ma'lumotlari topilmadi`);
    }

    return entity;
  }

  /* ========== ♻️ Update operation ========== */
  async update(
    id: number,
    updateDto: UpdateDto,
  ): Promise<ResponseData<Entity>> {
    const entity = await this.findOne(id);

    const updated = this.repository.merge(
      entity,
      updateDto as DeepPartial<Entity>,
    );

    const updatedData = await this.repository.save(updated);

    return new ResponseData<Entity>({
      success: true,
      message: `${this.entityName} ma'lumotlari muvaffaqiyatli yangilandi`,
      statusCode: HttpStatus.OK,
    });
  }

  /* ========== 🗑️ Delete operation ========== */
  async remove(id: number) {
    const entity = await this.findOne(id);

    await this.repository.remove(entity);

    return new ResponseData<Entity>({
      success: false,
      message: `${this.entityName} ma'lumoti muvaffaqiyatli o'chirildi`,
      statusCode: HttpStatus.OK,
    });
  }
}
