import { RedisModuleOptions, RedisModuleOptionsFactory } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  createRedisModuleOptions(): RedisModuleOptions {
    return {
      config: {
        host: 'localhost',
        port: 6379,
      },
    };
  }
}
