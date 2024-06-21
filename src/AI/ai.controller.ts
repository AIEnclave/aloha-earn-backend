import { Controller, Get, Query } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OpenaiService } from './ai.service';
import { TextCompletionDto, ImageCompletionDto, ImageFetchCompletionDto, ImageFetchQueryCompletionDto } from './dto/base.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate')
  async generateText(@Body() payload: TextCompletionDto): Promise<string> {
    console.log("payload::", payload.prompt)
    return this.openaiService.generateText(payload);
  }

  @Post('generate-ocr')
  async generateOCR(@Body() payload: ImageCompletionDto): Promise<string> {
    console.log("payload::", payload)
    return this.openaiService.generateOCR(payload);
  }

  @Post('fetch-ocr-data')
  async fetchOCR(@Body() payload: ImageFetchCompletionDto): Promise<string> {
    console.log("payload::", payload)
    return this.openaiService.fetchOCR(payload);
  }

  @Post('delete-ocr-data')
  async deleteOCR(): Promise<string> {
    return this.openaiService.deleteOCR();
  }

  @Post('fetch-query-ocr-data')
  async fetchOCRQuery(@Body() payload: ImageFetchQueryCompletionDto, @Res() res: Response): Promise<void> {
    console.log("payload:---------------:", payload)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await this.openaiService.fetchOCRQuery(payload);
    stream.on('data', (chunk) => {
      res.write(chunk);
    });
    stream.on('end', () => {
      res.end();
    });
  }

  @Post('update-ocr-data-analytics')
  async updateOCRAnalytics(@Body() payload: ImageFetchCompletionDto): Promise<string> {
    console.log("payload::", payload)
    return this.openaiService.updateOCRAnalytics(payload);
  }
}
