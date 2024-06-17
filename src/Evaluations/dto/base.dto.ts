import { IsString, IsNotEmpty, IsObject, IsNumber, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseEvaluationsDto {
    @IsObject()
    @IsNotEmpty()
    @Expose()
    response: object;

    @IsString()
    @IsNotEmpty()
    @Expose()
    evaluatorId: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    rate: number;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    seen: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    bookmarked: boolean;

    @IsString()
    @IsNotEmpty()
    @Expose()
    reason: string;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    isValidReason: boolean;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    moderationScore: number;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    updatedAt: Date;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    deletedAt: Date;
}