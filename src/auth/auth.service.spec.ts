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
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { RoleService } from "../role/role.service";
import { Role, RoleSchema } from "../schemas/role.schema";

describe("AuthService", () => {
  let authservice: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createJWTModule(),
        createInMemoryDatabaseModule(),
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, UserService, RoleService],
    }).compile();

    authservice = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);

    const payload = new CreateUserDto();
    payload.username = "user1";
    payload.password = "password1";
    await userService.create(payload);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(authservice).toBeDefined();
    expect(userService).toBeDefined();
  });

  it("should throw user doesn't exits error when user doesn't exist", async () => {
    const loginPayload = new LoginDto();
    loginPayload.username = "user2";
    loginPayload.password = "password2";

    await expect(authservice.login(loginPayload)).rejects.toThrow("user doesn't exit");
  });

  it("should throw  when password is incorrect", async () => {
    const loginPayload = new LoginDto();
    loginPayload.username = "user1";
    loginPayload.password = "password2";

    await expect(authservice.login(loginPayload)).rejects.toThrow("wrong password");
  });

  it("should return JWT when login info is correct ", async () => {
    const loginPayload = new LoginDto();
    loginPayload.username = "user1";
    loginPayload.password = "password1";

    const res = await authservice.login(loginPayload);

    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("token");
    expect(res.username).toBe(loginPayload.username);
  });
});
