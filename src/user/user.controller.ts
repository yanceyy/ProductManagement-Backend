import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";

@Controller("user")
@UseFilters(MongoErrorFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("sss");
    createUserDto.password = await argon2.hash(createUserDto.password);
    const res = await this.userService.create(createUserDto);

    // @ts-expect-error res has implicit attributes like _doc
    delete res._doc.password;
    return res;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
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
