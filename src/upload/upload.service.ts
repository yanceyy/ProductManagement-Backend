import { UploadMeta } from "../schemas/fileMeta.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  constructor(@InjectModel(UploadMeta.name) private metaModel: Model<UploadMeta>) {}

  async createUploadMeta(file: Express.Multer.File, user: User): Promise<UploadMeta> {
    const uploadMeta = new this.metaModel({
      upload_filename: file.filename,
      upload_username: user.username,
    });

    await uploadMeta.save();
    return uploadMeta;
  }
}
