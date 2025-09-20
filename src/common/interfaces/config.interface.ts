export interface ICookieConfig {
  secret: string;
  maxAge: number;
  cookieRefreshToken: string;
  cookieSecure: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
  password: string | undefined;
  ttl: number;
}
