import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest();
    if (!user || !user.user) return false;

    const { role } = user.user;
    const requiredRole = this.reflector.getAllAndOverride<string>("role", [context.getHandler(), context.getClass()]);

    return requiredRole ? role.includes(requiredRole) : true;
  }
}
