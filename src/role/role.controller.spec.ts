import { Test, TestingModule } from "@nestjs/testing";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "@schema/role.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { createWinstonModule } from "../test/helper/winston.mock.module";

describe("RoleController", () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        createInMemoryDatabaseModule(),
        createWinstonModule(),
      ],
      controllers: [RoleController],
      providers: [RoleService],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
