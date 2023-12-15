import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";
import { CUser } from "../decorator/user.decorator";
import { User } from "../schemas/user.schema";
import { Auth } from "../decorator/auth.decorator";

@Controller("role")
@UseFilters(MongoErrorFilter)
@Auth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @CUser() user: User) {
    return this.roleService.create(user, createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto, @CUser() user: User) {
    return this.roleService.updatePolicies(id, user, updateRoleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(id);
  }
}
