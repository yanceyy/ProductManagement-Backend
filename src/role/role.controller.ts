import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";
import { CUser } from "@decorator/user.decorator";
import { User } from "@schema/user.schema";
import { PolicyGard } from "@decorator/policy.decorator";
import { POLICIES } from "./policies";

@Controller("role")
@UseFilters(MongoErrorFilter)
@PolicyGard(POLICIES.manageRole)
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
    return this.roleService.findOne({ _id: id });
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
