import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "@schema/product.schema";
import {
  closeInMemoryDatabaseConnection,
  createInMemoryDatabaseModule,
} from "../test/helper/inMemoryDatabase.mock.module";
import { createWinstonModule } from "../test/helper/winston.mock.module";
import { v4 as uuidv4 } from "uuid";
import { CreateProductDto } from "./dto/create-product.dto";
import { mongo } from "mongoose";

const cateId = new mongo.ObjectId();
const pCateId = new mongo.ObjectId();
const productIds = {};

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

    // create pre-existing products in database to facilitate the testings
    const createProductDtos = [
      {
        name: "Test Product 1",
        price: 100,
        desc: "product info 1",
        categoryId: cateId,
        pCateId: pCateId,
      },
      {
        name: "Test Product 2",
        price: 101,
        desc: "product info 2",
        categoryId: cateId,
        pCateId: pCateId,
      },
    ] as unknown as CreateProductDto[];
    const testName = expect.getState().currentTestName; // Do the isolation in case products ids mix together

    for (const dto of createProductDtos) {
      const product = await service.create(dto);
      productIds[testName] = productIds[testName] ?? [];
      productIds[testName].push(product._id);
    }
  });

  afterEach(async () => await closeInMemoryDatabaseConnection());

  describe("create", () => {
    it("should successfully create a product", async () => {
      const cateId = uuidv4();
      const pCateId = uuidv4();

      const createProductDto = {
        name: "Test Product",
        price: 100,
        desc: "product info",
        categoryId: cateId,
        pCateId: pCateId,
      } as unknown as CreateProductDto;

      const res = await service.create(createProductDto);
      expect(res).toBeDefined();
    });
  });

  describe("findAll", () => {
    it("should return an array of all two products", async () => {
      const products = (await service.findAll(1, 10)).list;
      expect(products).toHaveLength(2);
    });

    it("should return an array of one products since we set the page size to 1", async () => {
      let products = (await service.findAll(1, 1)).list;
      expect(products).toHaveLength(1);

      products = (await service.findAll(2, 1)).list;
      expect(products).toHaveLength(1);
    });
  });

  describe("findOne", () => {
    it("should handle the existing product", async () => {
      const testName = expect.getState().currentTestName;
      expect(await service.findOne(productIds[testName][0])).not.toBeNull();
    });

    it("should handle non-existing product", async () => {
      expect(await service.findOne(new mongo.ObjectId().toString())).toBeNull();
    });
  });

  describe("remove", () => {
    it("should delete a product", async () => {
      const testName = expect.getState().currentTestName;
      const result = await service.remove(productIds[testName][0]);
      expect(result.deletedCount).toEqual(1);
    });

    // Test for non-existing product
    it("should handle non-existing product", async () => {
      const result = await service.remove(new mongo.ObjectId().toString());
      expect(result.deletedCount).toEqual(0);
    });
  });

  describe("search", () => {
    it("should return 2 products based on name search criteria", async () => {
      const products = await service.search(1, 10, "Test", "");
      expect(products.list).toHaveLength(2);
    });

    it("should return products based on name search criteria", async () => {
      const products = await service.search(1, 10, "Product 2", "");
      expect(products.list).toHaveLength(1);
    });

    it("should return 2 products based on description search criteria", async () => {
      const products = await service.search(1, 10, "", "product");
      expect(products.list).toHaveLength(2);
    });

    it("should return products based on description search criteria", async () => {
      const products = await service.search(1, 10, "", "info 2");
      expect(products.list).toHaveLength(1);
    });
  });
});
