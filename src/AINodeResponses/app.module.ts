import { Module } from '@nestjs/common';
import { AINodeResponsesService } from './app.service';
import { EvaluationsService } from '../Evaluations/app.service';
import { AINodeResponsesController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AINodeResponses, AINodeResponsesSchema } from './schemas/app.schema';
import { Evaluations, EvaluationsSchema } from '../Evaluations/schemas/app.schema';
import { UserService } from '../User/app.service';
import { User, UserSchema } from '../User/schemas/app.schema';

@Module({
  providers: [AINodeResponsesService, EvaluationsService, UserService],
  controllers: [AINodeResponsesController],
  imports: [
    MongooseModule.forFeature([{ name: AINodeResponses.name, schema: AINodeResponsesSchema }]),
    MongooseModule.forFeature([{ name: Evaluations.name, schema: EvaluationsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AINodeResponsesModule {}