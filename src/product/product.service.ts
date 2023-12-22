import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { paginationFind } from "../common/pagination";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  create(createProductDto: CreateProductDto) {
    return new this.productModel(createProductDto).save();
  }

  async findAll(pageNum: number, pageSize: number) {
    return paginationFind(this.productModel, pageNum, pageSize);
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
  }

  remove(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }

  async search(pageNum: number, pageSize: number, productName: string, productDesc: string) {
    if (!productName && !productName) {
      return await this.findAll(pageNum, pageSize);
    }

    let condition = {};

    if (productName) {
      condition = { name: new RegExp(`^.*${productName}.*$`, "i") };
    } else if (productDesc) {
      condition = { desc: new RegExp(`^.*${productDesc}.*$`, "im") };
    }

    return paginationFind(this.productModel, pageNum, pageSize, condition);
  }
}
