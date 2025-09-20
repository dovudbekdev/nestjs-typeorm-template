import { Injectable } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { Response } from 'express';
import { ICookieConfig } from '@common/interfaces';

@Injectable()
export class CookieService {
  cookieConfig: ICookieConfig;
  constructor(private readonly appConfigService: AppConfigService) {
    this.cookieConfig = appConfigService.cookieConfig;
  }

  setRefreshToken(response: Response, token: string): void {
    response.cookie(this.cookieConfig.cookieRefreshToken, token, {
      httpOnly: true,
      secure: this.cookieConfig.cookieSecure == 'true',
      maxAge: this.cookieConfig.maxAge * 24 * 60 * 60 * 1000, // millisekund
    });
  }

  clearRefreshToken(response: Response): void {
    response.clearCookie(this.cookieConfig.cookieRefreshToken, {
      httpOnly: true,
      secure: this.cookieConfig.cookieSecure == 'true',
    });
  }
}
