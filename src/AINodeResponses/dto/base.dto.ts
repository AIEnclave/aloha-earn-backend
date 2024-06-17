import { IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseAINodeResponsesDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    creatorId: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    nodeId: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    prompt: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    answer: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    accumulativePostiveRating: number;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    accumulativeNegativeRating: number;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}