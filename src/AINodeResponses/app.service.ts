import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { CreateAINodeResponsesDto } from './dto/create.dto';
import { UpdateAINodeResponsesDto } from './dto/update.dto';
import { AINodeResponses, AINodeResponsesDocument } from './schemas/app.schema';

@Injectable()
export class AINodeResponsesService {
  constructor(
    @InjectModel(AINodeResponses.name) private readonly model: Model<AINodeResponsesDocument>,
  ) {}

  async findAll(): Promise<AINodeResponses[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<AINodeResponses> {
    return await this.model.findById(id).exec();
  }

  async create(createAINodeResponsesDto: CreateAINodeResponsesDto): Promise<AINodeResponses> {
    return await new this.model({
      ...createAINodeResponsesDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateAINodeResponsesDto: UpdateAINodeResponsesDto): Promise<AINodeResponses> {
    return await this.model.findByIdAndUpdate(id, updateAINodeResponsesDto).exec();
  }

  async delete(id: string): Promise<AINodeResponses> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}