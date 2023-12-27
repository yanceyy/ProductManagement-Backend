import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  authGrantUsername: string;

  @Prop({ required: true })
  authGrantTime: number;

  @Prop({ default: Date.now })
  createTime: number;

  @Prop()
  policies: Array<string>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
