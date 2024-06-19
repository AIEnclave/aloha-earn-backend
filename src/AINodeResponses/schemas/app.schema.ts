import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AINodeResponsesDocument = AINodeResponses & Document;

@Schema()
export class AINodeResponses {

  @Prop()
  prompt: string;

  @Prop()
  answer: string;

  @Prop()
  category: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const AINodeResponsesSchema = SchemaFactory.createForClass(AINodeResponses);