import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import process from "process";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
