import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserSelectedCategoryDocument = UserSelectedCategory & Document;

@Schema()
export class UserSelectedCategory {
  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSelectedCategorySchema = SchemaFactory.createForClass(UserSelectedCategory);