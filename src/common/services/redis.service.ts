import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  private key(userId: number): string {
    return `refreshToken:${userId}`;
  }

  async save(userId: number, token: string): Promise<void> {
    await this.redis.set(this.key(userId), token);
  }

  async get(userId: number): Promise<string | undefined> {
    return this.redis.get<string>(this.key(userId));
  }

  async delete(userId: number): Promise<void> {
    await this.redis.del(this.key(userId));
  }

  async deleteAll(): Promise<void> {
    await this.redis.clear();
  }
}
