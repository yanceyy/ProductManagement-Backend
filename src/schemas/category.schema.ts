import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UseFilters } from "@nestjs/common";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";

@Schema()
@UseFilters(MongoErrorFilter)
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  pCategoryId: string;

  @Prop({ default: Date.now })
  createTime: number;

  @Prop({ required: true })
  createUsername: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
