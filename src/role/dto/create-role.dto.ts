import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty({ message: "role name can't be empty" })
  name: string;
}
