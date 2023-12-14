import { registerAs } from "@nestjs/config";
import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import type { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";

export const configFactory = () => {
  const transports: (FileTransportInstance | ConsoleTransportInstance)[] = [
    // File transports
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ];

  if (process.env.NODE_ENV !== "production") {
    // Only add Console transport in non-production environments
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike("admin-board", {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    );
  }

  return {
    level: process.env.LOG_LEVEL || "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: transports,
  };
};

export default registerAs("logging", configFactory);
