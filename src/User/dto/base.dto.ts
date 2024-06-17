import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseUserDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    profileImageUrl: string;

    @IsObject()
    @IsNotEmpty()
    @Expose()
    twitterProvider: object;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}