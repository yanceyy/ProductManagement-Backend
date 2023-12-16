import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../schemas/category.schema";
import { User } from "../schemas/user.schema";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}
  create(createUser: User, createCategoryDto: CreateCategoryDto) {
    return new this.categoryModel({ ...createCategoryDto, createUsername: createUser.username }).save();
  }

  findAll(pCategoryId: string) {
    return this.categoryModel.find({ pCategoryId });
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findOneAndUpdate({ _id: id }, updateCategoryDto, { new: true });
  }

  // TODO: delete and unbind the binding products
}
