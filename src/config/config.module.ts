import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';
import { typeormConfig } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
  ],
})
export class ConfigModules {}
