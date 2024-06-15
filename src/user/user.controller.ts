import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UserService } from './user.service';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly service: UserService) {}

    // @Get()
    // async index() {
    //   return await this.service.findAll();
    // }
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createTodoDto: CreateUserDto) {
      console.log({ createTodoDto });
      return await this.service.create(createTodoDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoDto: UpdateUserDto) {
      return await this.service.update(id, updateTodoDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }