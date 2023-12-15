import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UploadMeta {
  @Prop({ required: true })
  upload_username: string;

  @Prop({ required: true, unique: true })
  upload_filename: string;

  @Prop({ default: Date.now })
  create_time: number;
}

export const UploadMetaSchema = SchemaFactory.createForClass(UploadMeta);
