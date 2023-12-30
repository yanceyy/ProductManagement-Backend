import { Controller, Get, Post, Body, Patch, Param, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { User } from "@schema/user.schema";
import { CUser } from "@decorator/user.decorator";
import { PolicyGard } from "@decorator/policy.decorator";
import { POLICIES } from "../role/policies";

@Controller("category")
@PolicyGard(POLICIES.manageCategory)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @CUser() createUser: User) {
    return this.categoryService.create(createUser, createCategoryDto);
  }

  @Get()
  findAll(@Query("parentId") parentId: string) {
    return this.categoryService.findAll(parentId);
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
