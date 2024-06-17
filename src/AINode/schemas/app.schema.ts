import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AINodeDocument = AINode & Document;

@Schema()
export class AINode {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  creatorId: string;

  @Prop()
  aiModel: string;

  @Prop({ type: Object })
  data: object;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const AINodeSchema = SchemaFactory.createForClass(AINode);