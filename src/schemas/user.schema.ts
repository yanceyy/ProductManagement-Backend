import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  createTime: number;

  @Prop()
  email: string;

  @Prop()
  roleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
