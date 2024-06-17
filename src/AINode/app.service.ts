import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { CreateAINodeDto } from './dto/create.dto';
import { UpdateAINodeDto } from './dto/update.dto';
import { AINode, AINodeDocument } from './schemas/app.schema';

@Injectable()
export class AINodeService {
  constructor(
    @InjectModel(AINode.name) private readonly model: Model<AINodeDocument>,
  ) {}

  async findAll(): Promise<AINode[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<AINode> {
    return await this.model.findById(id).exec();
  }

  async create(createAINodeDto: CreateAINodeDto): Promise<AINode> {
    return await new this.model({
      ...createAINodeDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateAINodeDto: UpdateAINodeDto): Promise<AINode> {
    return await this.model.findByIdAndUpdate(id, updateAINodeDto).exec();
  }

  async delete(id: string): Promise<AINode> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}