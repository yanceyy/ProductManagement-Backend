import { Controller, Delete, Param, Post, UploadedFile } from "@nestjs/common";
import { RequireUploadImage } from "./uploadFileFilter";
import { User } from "../schemas/user.schema";
import { Auth } from "../decorator/auth.decorator";
import { CUser } from "../decorator/user.decorator";
import { UploadService } from "./upload.service";

@Controller("upload")
@Auth()
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post("image")
  @RequireUploadImage()
  async uploadImage(@UploadedFile() file: Express.Multer.File, @CUser() user: User) {
    await this.uploadService.createUploadMeta(file, user);
    return file;
  }

  @Delete("image/:id")
  @RequireUploadImage()
  async deleteImage(@Param("id") imgId, @CUser() user: User) {
    return this.uploadService.deleteImage(imgId);
  }
}
