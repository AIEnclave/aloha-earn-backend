import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateUserSelectedCategoryDto } from './dto/create.dto';
  import { UpdateUserSelectedCategoryDto } from './dto/update.dto';
  import { UserSelectedCategoryService } from './app.service';
  
  @Controller('user-selected-category')
  export class UserSelectedCategoryController {
    constructor(private readonly service: UserSelectedCategoryService) {}
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createUserSelectedCategoryDto: CreateUserSelectedCategoryDto) {
      console.log({ createUserSelectedCategoryDto });
      return await this.service.create(createUserSelectedCategoryDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserSelectedCategoryDto: UpdateUserSelectedCategoryDto) {
      return await this.service.update(id, updateUserSelectedCategoryDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }