import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function Auth() {
  return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) => {
    // Check if it's applied to a method
    if (descriptor) {
      applyDecorators(UseGuards(AuthGuard("jwt")))(target, propertyKey, descriptor);
      return;
    }

    // Applied to a class, modify all methods
    const methods = Object.getOwnPropertyNames(target.prototype);
    for (const method of methods) {
      if (method === "constructor") {
        continue;
      }

      const desc = Object.getOwnPropertyDescriptor(target.prototype, method);
      if (desc && desc.value) {
        applyDecorators(UseGuards(AuthGuard("jwt")))(target.prototype, method, desc);
      }
    }
  };
}
