import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    title: string;

    @IsString()
    image: string;

    @IsOptional()
    @IsNumber()
    likes?: number;
}
