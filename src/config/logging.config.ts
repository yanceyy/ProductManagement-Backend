import { registerAs } from "@nestjs/config";
import * as winston from "winston";
import "winston-daily-rotate-file";
import type { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import DailyRotateFile from "winston-daily-rotate-file";

// Create a custom format using printf
const prettyPrintFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  if (level === "error") {
    return `${timestamp} ${level} ${message} \n${stack}`;
  } else {
    const { handler, ...res } = message;

    const prettyMessage = JSON.stringify(res, null, 4); // Indent with 4 spaces

    return `${timestamp} ${level} ${handler} \n${prettyMessage}`;
  }
});

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

  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(prettyPrintFormat),
    }),
  );

  return {
    level: process.env.LOG_LEVEL || "debug",
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: transports,
    exceptionHandlers: transports,
  };
};

export default registerAs("logging", configFactory);
