import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query("pageNum") pageNum: number, @Query("pageSize") pageSize: number,) {
    return this.productService.findAll(pageNum, pageSize);
  }

  @Get("/search")
  search(@Query("pageNum") pageNum: number, @Query("pageSize") pageSize: number, @Query("productName") productName: string, @Query("productDesc") productDesc: string ) {
    return this.productService.search(pageNum, pageSize, productName, productDesc);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
