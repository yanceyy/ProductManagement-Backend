import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "@schema/product.schema";
import { createWinstonModule } from "../test/helper/winston.mock.module";

describe("ProductController", () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        createWinstonModule(),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      ],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
