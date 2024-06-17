import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseUserSelectedCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    userId: string;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}