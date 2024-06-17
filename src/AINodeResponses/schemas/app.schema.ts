import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AINodeResponsesDocument = AINodeResponses & Document;

@Schema()
export class AINodeResponses {
  @Prop()
  name: string;

  @Prop({ required: true })
  creatorId: string;

  @Prop({ required: true })
  nodeId: string;

  @Prop()
  prompt: string;

  @Prop()
  answer: string;

  @Prop()
  accumulativePostiveRating: number;

  @Prop()
  accumulativeNegativeRating: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const AINodeResponsesSchema = SchemaFactory.createForClass(AINodeResponses);