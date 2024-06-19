import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './User/app.module';
import { UserService } from './User/app.service';
import { AuthGuard } from './auth.gaurd';
import { UserSelectedCategoryModule } from './UserSelectedCategory/app.module';
import { AINodeModule } from './AINode/app.module';
import { AINodeResponsesModule } from './AINodeResponses/app.module';
import { CategoriesModule } from './Categories/app.module';
import { EvaluationsModule } from './Evaluations/app.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';
import * as redisStore from 'cache-manager-redis-store';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { RabbitMQConfigService } from './config/rabbitmq.config';
import { MongooseModule } from '@nestjs/mongoose';
// import { RedisConfigService } from './config/redis.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/Auth.module';
import { OpenaiModule } from "./AI/ai.module";

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
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    JwtModule.register({
      global: true,
      secret: process.env.AlohaProtocolSecret,
      signOptions: { expiresIn: '1h' },
    }),
    // RedisModule.forRootAsync({
    //   useClass: RedisConfigService,
    // }),
    // RabbitMQModule.forRootAsync({
    //   useClass: RabbitMQConfigService,
    // }),
    UserModule,
    UserSelectedCategoryModule,
    AINodeModule,
    AINodeResponsesModule,
    CategoriesModule,
    EvaluationsModule,
    AuthModule,
    OpenaiModule
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },],
})
export class AppModule { }
