import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "../schemas/role.schema";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}
  create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    // TODO: get username from JWT
    return this.roleModel.create({ name, auth_grant_username: "user1", auth_grant_time: Date.now() });
  }

  findAll() {
    return this.roleModel.find();
  }

  findOne(id: string) {
    return this.roleModel.findById(id);
  }

  updatePolicies(id: string, updateRoleDto: UpdateRoleDto) {
    const { policies } = updateRoleDto;
    return this.roleModel.findOneAndUpdate(
      { _id: id },
      { policies, auth_grant_time: Date.now() },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.roleModel.deleteOne({ _id: id });
  }
}
