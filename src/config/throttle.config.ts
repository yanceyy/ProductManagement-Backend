import { registerAs } from "@nestjs/config";

export default registerAs("throttle", () => ({
  global: [
    {
      ttl: process.env.GLOBAL_THROTTLE_TTL || 1000,
      limit: process.env.GLOBAL_THROTTLE_LIMIT || 20,
    },
  ],
}));
