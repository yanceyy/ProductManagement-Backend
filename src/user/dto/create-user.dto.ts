import { IsEmail, IsMongoId, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Username can't be empty" })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty({ message: "Password can't be empty" })
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsEmail({}, { message: "Incorrect email format" })
  @MaxLength(20)
  email: string;

  @IsPhoneNumber("AU", { message: "Incorrect phone number" })
  phone: string;

  @IsMongoId()
  roleId: string;
}
