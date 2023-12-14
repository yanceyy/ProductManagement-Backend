import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { createJWTModule } from "../test/helper/jwt.mock.module";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createJWTModule(),
        createInMemoryDatabaseModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
