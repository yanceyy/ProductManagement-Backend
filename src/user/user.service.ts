import { Injectable } from "@nestjs/common";
import { User } from "@schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteResult } from "mongodb";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await argon2.hash(createUserDto.password);
    const createdCat = new this.userModel(createUserDto);
    const res = await createdCat.save();
    // @ts-expect-error res has implicit attributes like _doc
    delete res._doc.password;
    return res;
  }

  findAll() {
    return this.userModel.find().lean();
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
