import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PolicyGard } from "@decorator/policy.decorator";
import { POLICIES } from "../role/policies";

@Controller("user")
@PolicyGard(POLICIES.manageUser)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    // @ts-expect-error res has implicit attributes like _doc
    delete user._doc.password;
    return user;
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...rest }) => rest);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.userService.findOne({ _id: id });

    delete user.password;
    return user;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
