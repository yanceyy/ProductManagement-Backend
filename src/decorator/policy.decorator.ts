import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { PolicyGuard } from "../guard/policyGuard.service";
import { AuthGuard } from "@nestjs/passport";

export function PolicyGard(role: string) {
  return applyDecorators(SetMetadata("role", role), UseGuards(AuthGuard("jwt"), PolicyGuard));
}
