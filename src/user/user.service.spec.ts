import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [createInMemoryDatabaseModule(), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
