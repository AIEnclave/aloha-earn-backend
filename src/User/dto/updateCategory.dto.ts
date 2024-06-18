import { IsString, IsArray, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class UpdateCategoryDto {
    @IsArray()
    @IsNotEmpty()
    @Expose()
    categories: string[];
}