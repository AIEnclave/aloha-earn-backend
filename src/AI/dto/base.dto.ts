import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class TextCompletionDto {
    @IsString()
    @MinLength(10)
    @MaxLength(20000)
    @ApiProperty({ example: 'How are you today?' })
    prompt: string;
}

export class ImageCompletionDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20000)
    @ApiProperty({ example: '' })
    ragCollectionName: string;
    keyValueCollectionName: string;
    analysingCollectionName: string;
    whyInvestCollectionName: string
}

export class ImageFetchCompletionDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20000)
    @ApiProperty({ example: '' })
    collectionName: string;
    key: string;
}

export class ImageFetchQueryCompletionDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20000)
    @ApiProperty({ example: '' })
    collectionName: string;
    query:string;
    key?: string;
}