import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UseFilters } from "@nestjs/common";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";

@Schema()
@UseFilters(MongoErrorFilter)
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  pCategoryId: string;

  @Prop()
  categoryId: string;

  @Prop({ default: Date.now })
  createTime: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  desc: string;

  @Prop()
  detail: string;

  @Prop()
  images: Array<string>;

  @Prop({ default: 1 })
  status: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
