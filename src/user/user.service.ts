import { Injectable } from "@nestjs/common";
import { User } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteResult } from "mongodb";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(queries: Record<string, string>) {
    return this.userModel.findOne(queries);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: id });
  }
}
