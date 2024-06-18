import { Module } from '@nestjs/common';
import { EvaluationsService } from './app.service';
import { UserService } from '../User/app.service';
import { EvaluationsController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluations, EvaluationsSchema } from './schemas/app.schema';
import { User, UserSchema } from '../User/schemas/app.schema';
import { UserModule } from '../User/app.module'; // Import UserModule

@Module({
  providers: [EvaluationsService, UserService],
  controllers: [EvaluationsController],
  exports: [EvaluationsService],
  imports: [
    MongooseModule.forFeature([{ name: Evaluations.name, schema: EvaluationsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class EvaluationsModule {}