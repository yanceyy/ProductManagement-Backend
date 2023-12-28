import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@schema/user.schema";
import { createWinstonModule } from "../test/helper/winston.mock.module";
import mongoose from "mongoose";

const fakeObjectId = new mongoose.Types.ObjectId().toString();
describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        createWinstonModule(),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);

    const request = {
      password: "ps1",
      username: "user0",
      phone: "0422222222",
      email: "a@a.com",
      roleId: fakeObjectId,
    };

    await controller.create(request);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  describe("create", () => {
    it("password should be removed from the returned value and others are preserved", async () => {
      const request = {
        password: "ps1",
        username: "user1",
        phone: "0422222222",
        email: "a@a.com",
        roleId: fakeObjectId,
      };

      const createduser = await controller.create(request);
      expect(createduser.password).toBeUndefined();

      delete request.password;

      expect(createduser).toMatchObject(request);
    });
  });

  describe("findAll", () => {
    it("should return user list without password", async () => {
      const users = await controller.findAll();
      expect(users).toHaveLength(1);
      users.forEach((user) => {
        expect(user).not.toHaveProperty("password");
      });
    });
  });

  describe("update", () => {
    it("update user info correctly", async () => {
      const request = {
        password: "ps1",
        username: "user1",
        phone: "0422222222",
        email: "a@a.com",
        roleId: fakeObjectId,
      };

      const createduser = await controller.create(request);
      expect(createduser).toBeDefined();

      const updatedRequest = {
        username: "user1",
        phone: "0433333333",
        email: "b@b.com",
      };

      await controller.update(createduser.id, updatedRequest);

      const updatedUser = await controller.findOne(createduser.id);
      expect(updatedUser).toMatchObject(updatedRequest);
    });
  });
});
