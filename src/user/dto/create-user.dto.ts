import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "username can't be empty" })
  name: string;

  @IsNotEmpty({ message: "passport can't be empty" })
  password: string;

  @IsOptional()
  @IsEmail({}, { message: "Incorrect email format" })
  email: string;

  @IsOptional()
  @IsPhoneNumber("AU", { message: "Incorrect phone number" })
  phone: string;

  @IsOptional()
  role_id: string;
}
