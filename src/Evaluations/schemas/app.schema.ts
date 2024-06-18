import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EvaluationsDocument = Evaluations & Document;

@Schema()
export class Evaluations {
  @Prop()
  response: string;

  @Prop({ required: true })
  evaluatorId: string;

  @Prop()
  rate: number;

  @Prop()
  reasonId: string;

  @Prop()
  isValidReason: boolean;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const EvaluationsSchema = SchemaFactory.createForClass(Evaluations);