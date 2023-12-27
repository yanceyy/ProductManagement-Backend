import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { MongoErrorFilter } from "@filter/mongoDBErrors.filter";

@Controller("auth")
@UseFilters(MongoErrorFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  login(@Body() loginFormData: LoginDto) {
    return this.authService.login(loginFormData);
  }
}
