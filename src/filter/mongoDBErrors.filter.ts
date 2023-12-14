// Try to catch MongoServerError but doesn't work
import { ArgumentsHost, Catch, ExceptionFilter, Inject, Injectable } from "@nestjs/common";
import { MongoServerError } from "mongodb";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import type { Response } from "express";

// the version of the current project's mongodb and the mongoose's mongodb must be same to be able to catch error
@Catch(MongoServerError)
@Injectable()
export class MongoErrorFilter implements ExceptionFilter {
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;
  catch(exception: MongoServerError, host: ArgumentsHost) {
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

    response.status(statusCode).json({
      message: message,
      error: "Bad Request",
      statusCode,
    });
  }
}
