import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "product name can't be empty" })
  @MinLength(5, { message: "product name must be longer than 5" })
  name: string;

  @IsNotEmpty({ message: "price can't be empty" })
  price: number;

  @IsNotEmpty({ message: "product detail can't be empty" })
  @MinLength(5, { message: "product detail must be longer than 5" })
  desc: string;

  @IsOptional()
  status: number;

  @IsOptional()
  detail: string;

  @IsNotEmpty({ message: "category Id can't be empty" })
  categoryId: string;

  @IsNotEmpty({ message: "first level category id can't be empty" })
  pCategoryId: string;

  @IsOptional()
  images: Array<string>;
}
