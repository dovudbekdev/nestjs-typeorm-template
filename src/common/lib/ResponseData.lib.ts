import { Tokens } from '@common/types';
import { HttpStatus } from '@nestjs/common';

export interface MetaData {
  page?: number; // hozirgi sahifa
  limit?: number; // sahifadagi elementlar soni
  total?: number; // jami elementlar soni
  totalPages?: number; // jami sahifalar soni
  hasNextPage?: boolean; // keyingi sahifa mavjudmi
  hasPrevPage?: boolean; // oldingi sahifa mavjudmi
  [key: string]: unknown; // qo‘shimcha maydonlar uchun
}

export class ResponseData<Entity> {
  success: boolean;
  message: string;
  statusCode: HttpStatus;
  data?: Entity;
  meta?: MetaData;
  tokens?: Tokens;

  constructor(options: {
    success: boolean;
    message: string;
    statusCode: HttpStatus;
    data?: Entity;
    tokens?: Tokens;
    meta?: MetaData;
  }) {
    this.success = options.success;
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.data = options.data;
    this.tokens = options.tokens;
    this.meta = options.meta;
  }
}
