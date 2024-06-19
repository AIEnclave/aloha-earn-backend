import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Req
  } from '@nestjs/common';
  import mongoose from 'mongoose';
  import { AuthGuard } from '../auth.gaurd';
  import { CreateAINodeResponsesDto } from './dto/create.dto';
  import { UpdateAINodeResponsesDto } from './dto/update.dto';
  import { AINodeResponsesService } from './app.service';
  import { EvaluationsService } from '../Evaluations/app.service';
  import { UserService } from '../User/app.service';
  
  interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object
  }

  @Controller('ai-node-responses')
  export class AINodeResponsesController {
    constructor(
      private readonly service: AINodeResponsesService,
      private readonly userService: UserService,
      private readonly evaluationService: EvaluationsService,
    ) {}
  
    @UseGuards(AuthGuard)
    @Get()
    async index(@Req() request: CustomRequest) {
      // console.log("::::request.user::::", request.user)
      let userDetails = await this.userService.findByTwitterId(request.user.userDetails);
      // console.log("userDetails:::", userDetails)
      const evaluatorId = (userDetails._id as mongoose.Types.ObjectId).toString();
      const categories = userDetails.categories || []
      const completedEvaluation = await this.evaluationService.findAllForUser(evaluatorId)
      // console.log("completedEvaluation", completedEvaluation)
      const allReasonId = completedEvaluation.map(evaluation => evaluation.reasonId)
      // console.log(":::allReasonId:::", allReasonId)
      return await this.service.findAll(allReasonId, categories);
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
    
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createAINodeResponsesDto: CreateAINodeResponsesDto) {
      console.log({ createAINodeResponsesDto });
      return await this.service.create(createAINodeResponsesDto);
    }
  }