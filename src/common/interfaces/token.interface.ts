import { Role } from '@common/enums';

export interface IJwtPayload {
  userId: number;
  role: Role;
}

export interface ITokneConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}
