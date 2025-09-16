import { Role } from '@common/enums';

export type JwtPayload = {
  userId: number;
  role: Role;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenType = 'access' | 'refresh';
