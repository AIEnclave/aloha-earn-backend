import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { RabbitMQConfigService } from './config/rabbitmq.config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisConfigService } from './config/redis.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      useClass: RedisConfigService,
    }),
    RabbitMQModule.forRootAsync({
      useClass: RabbitMQConfigService,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
