import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@schema/user.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { CreateUserDto } from "./dto/create-user.dto";

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

  it("should create user and return expected inf", async () => {
    const payload = new CreateUserDto();
    payload.username = "user1";
    payload.password = "password1";

    const user = await service.create(payload);
    expect(user.username).toEqual(payload.username);
    expect(user.password).toBeUndefined();

    expect(user).toHaveProperty("__v");
    expect(user).toHaveProperty("createTime");
  });
});
