import { Global, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadController } from "./upload.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UploadMeta, UploadMetaSchema } from "../schema/fileMeta.schema";
import { UploadService } from "./upload.service";
@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage(await configService.get("upload")),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: UploadMeta.name, schema: UploadMetaSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
