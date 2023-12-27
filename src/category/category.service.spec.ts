import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "@schema/category.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";

describe("CategoryService", () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
      ],
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
