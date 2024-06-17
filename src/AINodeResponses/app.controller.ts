import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateAINodeResponsesDto } from './dto/create.dto';
  import { UpdateAINodeResponsesDto } from './dto/update.dto';
  import { AINodeResponsesService } from './app.service';
  
  @Controller('ai-node-responses')
  export class AINodeResponsesController {
    constructor(private readonly service: AINodeResponsesService) {}
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createAINodeResponsesDto: CreateAINodeResponsesDto) {
      console.log({ createAINodeResponsesDto });
      return await this.service.create(createAINodeResponsesDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAINodeResponsesDto: UpdateAINodeResponsesDto) {
      return await this.service.update(id, updateAINodeResponsesDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }