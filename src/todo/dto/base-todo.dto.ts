import { IsString, IsNotEmpty } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BaseTodoDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description?: string;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}