import { Module } from '@nestjs/common';
import { OpenaiService } from './ai.service';
import { OpenaiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [OpenaiService],
  controllers: [OpenaiController],
})
export class OpenaiModule {}
