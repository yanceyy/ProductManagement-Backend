import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "username can't be empty" })
  username: string;
  @IsNotEmpty({ message: "password can't be empty" })
  password: string;
}
