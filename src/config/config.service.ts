import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodEnv(): string {
    return this.configService.get<string>('app.nodeEnv')!;
  }

  get port(): number {
    return this.configService.get<number>('app.port')!;
  }

  get dbConfig() {
    return this.configService.get('database');
  }
}
