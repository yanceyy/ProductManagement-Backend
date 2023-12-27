import { UploadMeta } from "@schema/fileMeta.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "@schema/user.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  constructor(@InjectModel(UploadMeta.name) private metaModel: Model<UploadMeta>) {}

  async createUploadMeta(file: Express.Multer.File, user: User): Promise<UploadMeta> {
    const uploadMeta = new this.metaModel({
      uploadFilename: file.filename,
      uploadUsername: user.username,
    });

    await uploadMeta.save();
    return uploadMeta;
  }

  async deleteImage(file: string) {
    return this.metaModel.deleteOne({ uploadFilename: file });
  }
}
