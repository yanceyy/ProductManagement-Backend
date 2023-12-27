import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Username can't be empty" })
  username: string;

  @IsNotEmpty({ message: "Password can't be empty" })
  password: string;

  @IsOptional()
  @IsEmail({}, { message: "Incorrect email format" })
  email: string;

  @IsOptional()
  @IsPhoneNumber("AU", { message: "Incorrect phone number" })
  phone: string;

  @IsOptional()
  roleId: string;
}
