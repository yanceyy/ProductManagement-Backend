import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "product name can't be empty" })
  name: string;

  @IsNotEmpty({ message: "price can't be empty" })
  price: number;

  @IsOptional()
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
