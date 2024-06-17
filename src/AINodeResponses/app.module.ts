import { Module } from '@nestjs/common';
import { AINodeResponsesService } from './app.service';
import { AINodeResponsesController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AINodeResponses, AINodeResponsesSchema } from './schemas/app.schema';

@Module({
  providers: [AINodeResponsesService],
  controllers: [AINodeResponsesController],
  imports: [
    MongooseModule.forFeature([{ name: AINodeResponses.name, schema: AINodeResponsesSchema }]),
  ],
})
export class AINodeResponsesModule {}