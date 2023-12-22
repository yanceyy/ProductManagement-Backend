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
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import throttleConfig from "./config/throttle.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loggingConfig, dbConfig, uploadConfig, throttleConfig],
      cache: true,
      envFilePath: [`.env.${process?.env.NODE_ENV ?? "local"}`],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get("throttle").global,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get("logging")),
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
    // serve complied front end project files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../build"),
    }),
    UserModule,
    AuthModule,
    RoleModule,
    UploadModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
