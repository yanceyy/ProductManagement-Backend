import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { UserService } from "../user/user.service";
import { createJWTModule } from "../test/helper/jwt.mock.module";
import { createWinstonModule } from "../test/helper/winston.mock.module";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        createJWTModule(),
        createWinstonModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
