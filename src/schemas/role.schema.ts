import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  auth_grant_username: string;

  @Prop({ required: true })
  auth_grant_time: number;

  @Prop({ default: Date.now })
  create_time: number;

  @Prop()
  policies: Array<string>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
