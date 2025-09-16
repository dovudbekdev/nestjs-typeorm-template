import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';
import { typeormConfig } from './typeorm.config';
import { AppConfigService } from './config.service';
import { jwtConfig } from './jwt.config';

@Global() // AppConfigModule'dagi providers va controllerlarni har qanday module'da yozish mumkin
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig, jwtConfig  ],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
