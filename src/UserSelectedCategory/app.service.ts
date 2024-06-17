import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { CreateUserSelectedCategoryDto } from './dto/create.dto';
import { UpdateUserSelectedCategoryDto } from './dto/update.dto';
import { UserSelectedCategory, UserSelectedCategoryDocument } from './schemas/app.schema';

@Injectable()
export class UserSelectedCategoryService {
  constructor(
    @InjectModel(UserSelectedCategory.name) private readonly model: Model<UserSelectedCategoryDocument>,
  ) {}

  async findAll(): Promise<UserSelectedCategory[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<UserSelectedCategory> {
    return await this.model.findById(id).exec();
  }

  async create(createUserSelectedCategoryDto: CreateUserSelectedCategoryDto): Promise<UserSelectedCategory> {
    return await new this.model({
      ...createUserSelectedCategoryDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateUserSelectedCategoryDto: UpdateUserSelectedCategoryDto): Promise<UserSelectedCategory> {
    return await this.model.findByIdAndUpdate(id, updateUserSelectedCategoryDto).exec();
  }

  async delete(id: string): Promise<UserSelectedCategory> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}