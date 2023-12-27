import { registerAs } from "@nestjs/config";
import * as winston from "winston";
import "winston-daily-rotate-file";
import type { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import DailyRotateFile from "winston-daily-rotate-file";

export const configFactory = () => {
  const transports: (FileTransportInstance | ConsoleTransportInstance | DailyRotateFile)[] =
    process.env.NODE_ENV !== "test"
      ? [
          // File transports
          new winston.transports.DailyRotateFile({
            level: "error",
            dirname: "logs",
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "512k",
          }),
          new winston.transports.DailyRotateFile({
            level: "info",
            dirname: "logs",
            filename: "combined-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "512k",
          }),
        ]
      : [];

  if (process.env.NODE_ENV !== "production") {
    // Only add Console transport in non-production environments
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.splat(),
          winston.format.json(),
        ),
      }),
    );
  }

  return {
    level: process.env.LOG_LEVEL || "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.splat(), winston.format.json()),
    transports: transports,
  };
};

export default registerAs("logging", configFactory);
