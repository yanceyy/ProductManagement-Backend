import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
  @IsNotEmpty({ message: "product name can't be empty" })
  @MinLength(5, { message: "product name must be longer than 5" })
  @MaxLength(100, { message: "product name must be shorter than 100" })
  name: string;

  @IsNotEmpty({ message: "price can't be empty" })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  price: number;

  @IsNotEmpty({ message: "product description can't be empty" })
  @MaxLength(200, { message: "product description must be shorter than 200" })
  desc: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: "status must be either 0 or 1" })
  status: number;

  @IsOptional()
  @MaxLength(500, { message: "product detail must be shorter than 500" })
  detail: string;

  @IsNotEmpty({ message: "category Id can't be empty" })
  @IsMongoId()
  categoryId: string;

  @IsNotEmpty({ message: "first level category id can't be empty" })
  @IsMongoId()
  pCategoryId: string;

  @IsOptional()
  images: Array<string>;
}
