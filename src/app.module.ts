// Nestjs va tashqi kutubxonalar
import { Module, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import log from 'consola';

// Loyihaning xususiy modullari va local fayllar
import { AppConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from '@config/config.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
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
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
