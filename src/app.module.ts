import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import process from "process";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import loggingConfig from "./config/logging.config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RoleModule } from "./role/role.module";
import { UploadModule } from "./upload/upload.module";
import dbConfig from "./config/db.config";
import uploadConfig from "./config/upload.config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loggingConfig, dbConfig, uploadConfig],
      cache: true,
      envFilePath: [`.env.${process?.env.NODE_ENV ?? "local"}`],
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get("upload")),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get("mongoDB")),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/files",
      rootPath: join(__dirname, "..", "upload"),
    }),
    UserModule,
    AuthModule,
    RoleModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
