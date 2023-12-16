import { Controller, Get, Post, Body, Patch, Param, UseFilters } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { MongoErrorFilter } from "../filter/mongoDBErrors.filter";
import { Auth } from "../decorator/auth.decorator";
import { User } from "../schemas/user.schema";
import { CUser } from "../decorator/user.decorator";

@Controller("category")
@UseFilters(MongoErrorFilter)
@Auth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @CUser() createUser: User) {
    return this.categoryService.create(createUser, createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
