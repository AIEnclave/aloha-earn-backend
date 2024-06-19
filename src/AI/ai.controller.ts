import { Controller, Get, Query } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OpenaiService } from './ai.service';
import { TextCompletionDto } from './dto/base.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate')
  async generateText(@Body() payload: TextCompletionDto): Promise<string> {
    console.log("payload::", payload.prompt)
    return this.openaiService.generateText(payload);
  }

  @Post('generate-ocr')
  async generateOCR(@Body() payload: TextCompletionDto): Promise<string> {
    console.log("payload::", payload.prompt)
    return this.openaiService.generateOCR(payload);
  }
}
