import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { RoleService } from "../role/role.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly roleService: RoleService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async login(loginFormData: LoginDto) {
    const { username, password } = loginFormData;

    this.logger.info({ handler: `${AuthService.name}:login`, payload: { username } });

    const user = await this.userService.findOne({ username });
    if (!user) throw new BadRequestException("user doesn't exit");

    const psMatch = await argon2.verify(user.password, password);

    if (!psMatch) throw new BadRequestException("wrong password");

    const { id, roleId } = user;
    let role: Array<string> = [];
    if (roleId) {
      const grantPermission = await this.roleService.findOne({ _id: roleId });
      role = grantPermission.policies;
    }

    const payload = {
      username,
      id,
      role,
    };

    this.logger.info({ handler: `${AuthService.name}:login:success`, payload: { username } });

    return {
      ...payload,
      token: await this.jwt.signAsync(payload),
    };
  }
}
