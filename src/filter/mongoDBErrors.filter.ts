// Try to catch MongoServerError but doesn't work
import { ArgumentsHost, Catch, ExceptionFilter, Inject, Injectable } from "@nestjs/common";
import { MongoServerError } from "mongodb";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import type { Response } from "express";

@Catch(Error)
@Injectable()
export class MongoErrorFilter implements ExceptionFilter {
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;
  catch(exception: MongoServerError, host: ArgumentsHost) {
    /* since exception.constructor === MongoServerError "mongodb" is false
      can check an instance type by using instanceof
     */
    if (exception.name === "MongoServerError") {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      let message: string, statusCode: number;

      switch (exception.code) {
        case 11000: {
          message = "username already Exists";
          statusCode = 400;
          break;
        }
        default: {
          this.logger.error("mongodbDB error", exception.message);
          message = "DB error";
          statusCode = 500;
          break;
        }
      }
      this.logger.error("DB error", exception);
      response.status(statusCode).json({
        message: message,
        error: "Bad Request",
        statusCode,
      });
    }
  }
}
