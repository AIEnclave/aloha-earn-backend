import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Model } from 'mongoose';
import { CreateEvaluationsDto } from './dto/create.dto';
import { UpdateEvaluationsDto } from './dto/update.dto';
import { Evaluations, EvaluationsDocument } from './schemas/app.schema';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluations.name) private readonly model: Model<EvaluationsDocument>,
  ) {}

  async findAll(): Promise<Evaluations[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Evaluations> {
    return await this.model.findById(id).exec();
  }

  async create(createEvaluationsDto: CreateEvaluationsDto): Promise<Evaluations> {
    return await new this.model({
      ...createEvaluationsDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateEvaluationsDto: UpdateEvaluationsDto): Promise<Evaluations> {
    return await this.model.findByIdAndUpdate(id, updateEvaluationsDto).exec();
  }

  async delete(id: string): Promise<Evaluations> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}