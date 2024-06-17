import { Module } from '@nestjs/common';
import { EvaluationsService } from './app.service';
import { EvaluationsController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluations, EvaluationsSchema } from './schemas/app.schema';

@Module({
  providers: [EvaluationsService],
  controllers: [EvaluationsController],
  imports: [
    MongooseModule.forFeature([{ name: Evaluations.name, schema: EvaluationsSchema }]),
  ],
})
export class EvaluationsModule {}