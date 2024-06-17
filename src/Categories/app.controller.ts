import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateCategoriesDto } from './dto/create.dto';
  import { UpdateCategoriesDto } from './dto/update.dto';
  import { CategoriesService } from './app.service';
  
  @Controller('users')
  export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createCategoriesDto: CreateCategoriesDto) {
      console.log({ createCategoriesDto });
      return await this.service.create(createCategoriesDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
      return await this.service.update(id, updateCategoriesDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }