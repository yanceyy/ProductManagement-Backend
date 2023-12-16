import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UploadMeta {
  @Prop({ required: true })
  uploadUsername: string;

  @Prop({ required: true, unique: true })
  uploadFilename: string;

  @Prop({ default: Date.now })
  createTime: number;
}

export const UploadMetaSchema = SchemaFactory.createForClass(UploadMeta);
