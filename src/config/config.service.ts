import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IJwtConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

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

  get jwtConfig(): IJwtConfig {
    return this.configService.getOrThrow<IJwtConfig>('jwt');
  }
}
