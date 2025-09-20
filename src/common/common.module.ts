import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services';

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class CommonModele {}
