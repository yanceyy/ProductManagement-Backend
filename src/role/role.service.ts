import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "../schemas/role.schema";
import { User } from "../schemas/user.schema";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}
  create(user: User, createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const { username } = user;

    return this.roleModel.create({
      name,
      authGrantTime: Date.now(),
      authGrantUsername: username,
    });
  }

  findAll() {
    return this.roleModel.find();
  }

  findOne(id: string) {
    return this.roleModel.findById(id);
  }

  updatePolicies(id: string, user: User, updateRoleDto: UpdateRoleDto) {
    const { policies } = updateRoleDto;
    const { username } = user;
    return this.roleModel.findOneAndUpdate(
      { _id: id },
      { policies, authGrantTime: Date.now(), authGrantUsername: username },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.roleModel.deleteOne({ _id: id });
  }
}
