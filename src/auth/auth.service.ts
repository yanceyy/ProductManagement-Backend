import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(loginFormData: LoginDto) {
    const { username, password } = loginFormData;
    const user = await this.userService.findOne({ username });
    if (!user) throw new BadRequestException("user doesn't exit");

    const psMatch = await argon2.verify(user.password, password);

    if (!psMatch) throw new BadRequestException("wrong password");

    const payload = {
      username: user.username,
      id: user.id,
      role: [],
    };

    return {
      ...payload,
      token: await this.jwt.signAsync(payload),
    };
  }
}
