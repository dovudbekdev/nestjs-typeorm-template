import { ICookieConfig, IRedisConfig, ITokneConfig } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// export type IDbConfig = TypeOrmModuleOptions & {
//   autoLoadEntities: boolean;
//   synchronize: boolean;
// };

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodEnv(): string {
    return this.configService.get<string>('app.nodeEnv', 'development');
  }

  get port(): number {
    return this.configService.get<number>('app.port', 3000);
  }

  get dbConfig() {
    return this.configService.get('database');
  }

  get paginationLimit(): number {
    return this.configService.get<number>('app.paginationLimit', 10);
  }

  get tokenConfig(): ITokneConfig {
    return this.configService.getOrThrow<ITokneConfig>('jwt');
  }

  get cookieConfig(): ICookieConfig {
    return this.configService.getOrThrow<ICookieConfig>('cookies');
  }

  get redisConfig(): IRedisConfig {
    return this.configService.getOrThrow<IRedisConfig>('redis');
  }
}
