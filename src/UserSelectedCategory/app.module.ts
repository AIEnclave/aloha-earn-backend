import { Module } from '@nestjs/common';
import { UserSelectedCategoryService } from './app.service';
import { UserSelectedCategoryController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSelectedCategory, UserSelectedCategorySchema } from './schemas/app.schema';

@Module({
  providers: [UserSelectedCategoryService],
  controllers: [UserSelectedCategoryController],
  imports: [
    MongooseModule.forFeature([{ name: UserSelectedCategory.name, schema: UserSelectedCategorySchema }]),
  ],
})
export class UserSelectedCategoryModule {}