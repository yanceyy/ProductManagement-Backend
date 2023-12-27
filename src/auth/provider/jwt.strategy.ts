import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { RoleService } from "../../role/role.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("TOKEN_SECRET"),
    });
  }

  async validate({ id }) {
    const user = await this.userService.findOne({ _id: id });
    if (!user || !user.roleId) {
      throw new UnauthorizedException("User not found or has no assigned role.");
    }

    const role = await this.roleService.findOne({ _id: user.roleId });
    if (!role || !role.policies) {
      throw new ForbiddenException("User role is invalid or has no policies.");
    }

    // Attach user and role to the request obj, so we can use these info to verify user's role in guard
    return { user, role: role.policies };
  }
}
