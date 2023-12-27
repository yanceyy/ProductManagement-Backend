import { Test, TestingModule } from "@nestjs/testing";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "@schema/category.schema";
import { createWinstonModule } from "../test/helper/winston.mock.module";

describe("CategoryController", () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        createWinstonModule(),
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
      ],
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
