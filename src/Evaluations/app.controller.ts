import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards
  } from '@nestjs/common';
  import mongoose from 'mongoose';
  import { AuthGuard } from '../auth.gaurd';
  import { CreateEvaluationsDto } from './dto/create.dto';
  import { UpdateEvaluationsDto } from './dto/update.dto';
  import { EvaluationsService } from './app.service';
  import { UserService } from '../User/app.service';

  interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object
  }
  
  @Controller('evaluations')
  export class EvaluationsController {
    constructor(
      private readonly service: EvaluationsService,
      private readonly userService: UserService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createEvaluationsDto: CreateEvaluationsDto, @Req() request: CustomRequest) {
      console.log({ createEvaluationsDto });
      console.log("::::request.user::::", request.user)
      let userDetails = await this.userService.findByTwitterId(request.user.userDetails);
      console.log("userDetails:::", userDetails)
      createEvaluationsDto.evaluatorId = (userDetails._id as mongoose.Types.ObjectId).toString();
      return await this.service.create(createEvaluationsDto);
    }
  }