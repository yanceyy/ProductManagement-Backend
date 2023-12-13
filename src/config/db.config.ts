import { registerAs } from "@nestjs/config";

export default registerAs("mongoDB", () => ({
  uri: process.env.DB_URI,
}));
