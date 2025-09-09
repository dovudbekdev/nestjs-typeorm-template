import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nestjs CRUD')
  .setDescription(
    'NestJS + TypeORM uchun shablon loyiha. Strukturani unutib qo‘ymaslik va tezda yangi loyihalarni boshlash uchun. ',
  )
  .build();
