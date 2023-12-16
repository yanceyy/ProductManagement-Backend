import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from "@nestjs/common";

const FILE_SIZE_LIMITS = 1024 * 1024 * 3; // 3 mb

export function filterFilter(type: string) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.includes(type)) {
      callback(new UnsupportedMediaTypeException("unsupported file"), false);
    } else {
      callback(null, true);
    }
  };
}

export function upload(field = "file", options: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(field, options)));
}

export function RequireUploadImage(field = "file") {
  return upload(field, {
    limits: FILE_SIZE_LIMITS,
    fileFilter: filterFilter("image"),
  } as MulterOptions);
}
