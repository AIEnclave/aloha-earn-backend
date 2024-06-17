import { Module } from '@nestjs/common';
import { AINodeService } from './app.service';
import { AINodeController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AINode, AINodeSchema } from './schemas/app.schema';

@Module({
  providers: [AINodeService],
  controllers: [AINodeController],
  imports: [
    MongooseModule.forFeature([{ name: AINode.name, schema: AINodeSchema }]),
  ],
})
export class AINodeModule {}