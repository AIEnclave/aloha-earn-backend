import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateAINodeDto } from './dto/create.dto';
  import { UpdateAINodeDto } from './dto/update.dto';
  import { AINodeService } from './app.service';
  
  @Controller('ainode')
  export class AINodeController {
    constructor(private readonly service: AINodeService) {}
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createUserDto: CreateAINodeDto) {
      console.log({ createUserDto });
      return await this.service.create(createUserDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateAINodeDto) {
      return await this.service.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }