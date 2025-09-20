// Nestjs va tashqi kutubxonalar
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import log from 'consola';

// Loyihaning xususiy modullari va local fayllar
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from '@common/services/config.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@config/app.config';
import { typeormConfig } from '@config/typeorm.config';
import { jwtConfig } from '@config/jwt.config';
import { cookieConfig } from '@config/cookie.config';
import { CommonModele } from '@common/common.module';
import { redisConfig } from '@config/redis.config';

@Module({
  imports: [
    CommonModele,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig, jwtConfig, cookieConfig, redisConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        const store = await redisStore(appConfigService.redisConfig);
        return {
          store: () => store,
        };
      },
    }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: async (appconfigService: AppConfigService) => {
        try {
          const dataSource = new DataSource(appconfigService.dbConfig);

          await dataSource.initialize();

          return appconfigService.dbConfig;
        } catch (error) {
          let message = error.message;

          switch (error.code) {
            case '28P01':
              message = "Ma'lumotlar bazasi paroli xato";
              break;
            case '3D000':
              message =
                error.message.split(' ')[1] +
                " nomdagi ma'lumotlar bazasi mavjud emas";
              break;
            case 'ECONNREFUSED':
              message = error.message.split(':').at(-1) + ' port xato';
          }

          log.error({ message, code: error.code });
          process.exit(1);
        }
      },
    }),

    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
  ],
})
export class AppModule {}
