import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "@schema/product.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { createWinstonModule } from "../test/helper/winston.mock.module";

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createInMemoryDatabaseModule(),
        createWinstonModule(),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      ],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
