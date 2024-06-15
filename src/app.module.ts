import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';
import * as redisStore from 'cache-manager-redis-store';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
// import { RabbitMQConfigService } from './config/rabbitmq.config';
import { MongooseModule } from '@nestjs/mongoose';
// import { RedisConfigService } from './config/redis.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({ 
      isGlobal: true,
      // store: redisStore,
      // host: 'localhost',
      // port: 6379,
    }),
    // RedisModule.forRootAsync({
    //   useClass: RedisConfigService,
    // }),
    // RabbitMQModule.forRootAsync({
    //   useClass: RabbitMQConfigService,
    // }),
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
