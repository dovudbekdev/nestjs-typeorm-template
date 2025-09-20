import { Request } from 'express';
import { IJwtPayload } from './token.interface';

export interface AuthenticationRequest extends Request {
  user?: IJwtPayload;
  refreshToken: string;
}
