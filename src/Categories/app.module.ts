import { Module } from '@nestjs/common';
import { CategoriesService } from './app.service';
import { CategoriesController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/app.schema';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesSchema }]),
  ],
})
export class CategoriesModule {}