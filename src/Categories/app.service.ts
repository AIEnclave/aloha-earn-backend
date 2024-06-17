import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { CreateCategoriesDto } from './dto/create.dto';
import { UpdateCategoriesDto } from './dto/update.dto';
import { Categories, CategoriesDocument } from './schemas/app.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private readonly model: Model<CategoriesDocument>,
  ) {}

  async findAll(): Promise<Categories[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Categories> {
    return await this.model.findById(id).exec();
  }

  async create(createCategoriesDto: CreateCategoriesDto): Promise<Categories> {
    return await new this.model({
      ...createCategoriesDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateCategoriesDto: UpdateCategoriesDto): Promise<Categories> {
    return await this.model.findByIdAndUpdate(id, updateCategoriesDto).exec();
  }

  async delete(id: string): Promise<Categories> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}