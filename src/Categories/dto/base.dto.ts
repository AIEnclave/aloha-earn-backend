import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseCategoriesDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description: string;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}