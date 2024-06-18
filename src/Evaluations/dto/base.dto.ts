import { IsString, IsNotEmpty, IsObject, IsNumber, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseEvaluationsDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    response: string;
    
    @IsString()
    @IsNotEmpty()
    @Expose()
    evaluatorId: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    rate: number;

    @IsString()
    @IsNotEmpty()
    @Expose()
    reasonId: string;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    isValidReason: boolean;
}