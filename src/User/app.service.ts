import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { User, UserDocument } from './schemas/app.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async findCategoryByTwitterId(createUserDto: CreateUserDto): Promise<User> {
    console.log("createUserDto.twitterProvider", createUserDto.twitterProvider)
    return await this.model.findOne({
      twitterUserId: createUserDto.twitterUserId
    }).exec();
  }

  async findByTwitterId(createUserDto: CreateUserDto): Promise<User> {
    // console.log("createUserDto.twitterProvider", createUserDto.twitterProvider)
    return await this.model.findOne({
      twitterUserId: createUserDto.twitterUserId
    }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  }

  async update(filter: object, updateUserDto: UpdateUserDto): Promise<User> {
    console.log("::::===updateUserDto===::::", updateUserDto)
    return await this.model.findOneAndUpdate(filter, updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}