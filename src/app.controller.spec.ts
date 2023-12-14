import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WinstonModule } from "nest-winston";
import { configFactory } from "./config/logging.config";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot(configFactory())],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
