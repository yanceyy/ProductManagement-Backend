import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Format error messages raised from ValidationPipe
    // Format unauthorization exception
    if (exception instanceof BadRequestException || exception instanceof UnauthorizedException) {
      const exceptionResponse = exception.getResponse();
      const status = exception.getStatus();
      if (typeof exceptionResponse === "object") {
        if ("message" in exceptionResponse) {
          response.status(status).json({
            message: exceptionResponse.message,
          });
        }
      } else {
        response.status(status).json({
          message: exceptionResponse,
        });
      }
      return;
    }

    this.logger.error(exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  }
}
