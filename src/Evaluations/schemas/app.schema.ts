import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EvaluationsDocument = Evaluations & Document;

@Schema()
export class Evaluations {
  @Prop({ type: Object })
  response: object;

  @Prop({ required: true })
  evaluatorId: string;

  @Prop()
  rate: number;

  @Prop()
  seen: boolean;

  @Prop()
  bookmarked: boolean;

  @Prop()
  reason: string;

  @Prop()
  isValidReason: boolean;

  @Prop()
  moderationScore: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const EvaluationsSchema = SchemaFactory.createForClass(Evaluations);