import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class LogConsumeTimeInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handlerMethod = context.getHandler();
    const controllerClass = context.getClass();
    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        this.logger.info({
          handler: `${controllerClass.name}::${handlerMethod.name}`,
          time: Date.now() - now,
          unit: "ms",
        }),
      ),
    );
  }
}
