import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateEvaluationsDto } from './dto/create.dto';
  import { UpdateEvaluationsDto } from './dto/update.dto';
  import { EvaluationsService } from './app.service';
  
  @Controller('evaluations')
  export class EvaluationsController {
    constructor(private readonly service: EvaluationsService) {}
  
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post()
    async create(@Body() createEvaluationsDto: CreateEvaluationsDto) {
      console.log({ createEvaluationsDto });
      return await this.service.create(createEvaluationsDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEvaluationsDto: UpdateEvaluationsDto) {
      return await this.service.update(id, updateEvaluationsDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }