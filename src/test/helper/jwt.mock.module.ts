import { JwtModule } from "@nestjs/jwt";

export const createJWTModule = () =>
  JwtModule.register({
    secret: "testing_mocked_secret",
    signOptions: { expiresIn: "3d" },
  });
