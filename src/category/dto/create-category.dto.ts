import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: "category name can't be empty" })
  name: string;

  @IsOptional()
  pCategoryId: string;
}
