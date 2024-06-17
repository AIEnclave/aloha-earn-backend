import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseAINodeDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    category: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    creatorId: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    aiModel: string;

    @IsObject()
    @IsNotEmpty()
    @Expose()
    data: object;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    updatedAt: Date;
}