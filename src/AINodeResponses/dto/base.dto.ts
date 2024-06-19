import { IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseAINodeResponsesDto {

    @IsString()
    @IsNotEmpty()
    @Expose()
    prompt: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    answer: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    category: string;
}