import { Test, TestingModule } from "@nestjs/testing";
import { RoleService } from "./role.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "@schema/role.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";

describe("RoleService", () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), createInMemoryDatabaseModule()],
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
