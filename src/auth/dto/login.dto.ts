import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "username can't be empty" })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty({ message: "password can't be empty" })
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
