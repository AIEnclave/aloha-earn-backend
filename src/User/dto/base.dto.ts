import { IsString, IsArray, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseUserDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    twitterUserId: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    profileImageUrl: string;

    @IsArray()
    @Expose()
    categories: string[];

    @IsObject()
    @IsNotEmpty()
    @Expose()
    twitterProvider: object;
}