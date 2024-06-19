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
    user?: any;
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
      // openai call
      let userDetails = await this.userService.findByTwitterId(request.user.userDetails);
      userDetails.tokenEarned += 1
      await this.userService.update({twitterUserId: userDetails.twitterUserId}, userDetails);
      createEvaluationsDto.evaluatorId = (userDetails._id as mongoose.Types.ObjectId).toString();
      return await this.service.create(createEvaluationsDto);
    }
  }