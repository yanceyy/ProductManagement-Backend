import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  create_time: number;

  @Prop()
  email: string;

  @Prop()
  role_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
