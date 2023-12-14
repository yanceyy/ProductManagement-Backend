import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

let mongod: MongoMemoryServer;

export const createInMemoryDatabaseModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeInMemoryDatabaseConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

export const clearInMemoryDatabaseConnection = async () => {
  if (mongod) await mongod.cleanup();
};
