import { Inject, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { paginationFind } from "../common/pagination";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  create(createProductDto: CreateProductDto) {
    this.logger.info({ name: `${ProductService.name}:create`, payload: createProductDto });

    return new this.productModel(createProductDto).save();
  }

  async findAll(pageNum: number, pageSize: number) {
    this.logger.info({ name: `${ProductService.name}:findAll`, payload: { pageNum, pageSize } });

    const products = await paginationFind(this.productModel, pageNum, pageSize);

    this.logger.info({
      name: `${ProductService.name}:search`,
      results: { productCount: products.list.length },
    });

    return products;
  }

  findOne(id: string) {
    this.logger.info({ name: `${ProductService.name}:findOne`, payload: { id } });

    return this.productModel.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.info({ name: `${ProductService.name}:update`, payload: { id, UpdateProductDto } });

    return this.productModel.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
  }

  remove(id: string) {
    this.logger.info({ name: `${ProductService.name}:remove`, payload: { id } });

    return this.productModel.deleteOne({ _id: id });
  }

  async search(pageNum: number, pageSize: number, productName: string, productDesc: string) {
    this.logger.info({
      name: `${ProductService.name}:search`,
      payload: { pageNum, pageSize, productName, productDesc },
    });

    if (!productName && !productName) {
      return await this.findAll(pageNum, pageSize);
    }

    let condition = {};

    if (productName) {
      condition = { name: new RegExp(`^.*${productName}.*$`, "i") };
    } else if (productDesc) {
      condition = { desc: new RegExp(`^.*${productDesc}.*$`, "im") };
    }
    const products = await paginationFind(this.productModel, pageNum, pageSize, condition);

    this.logger.info({
      name: `${ProductService.name}:search`,
      results: { productCount: products.list.length },
    });

    return products;
  }
}
