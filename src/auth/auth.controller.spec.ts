import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { createWinstonModule } from "../test/helper/winston.mock.module";
import { LoginDto } from "./dto/login.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [createWinstonModule()],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("login", () => {
    it("should return a token on successful login", async () => {
      const loginDto: LoginDto = {
        username: "admin",
        password: "admin",
      };

      const mockResponse = { token: "some-token", username: "admin", id: "1", role: ["admin"] };
      jest.spyOn(authService, "login").mockResolvedValue(mockResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(mockResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it("should throw an error for invalid credentials", async () => {
      const loginDto: LoginDto = {
        username: "admin",
        password: "admin",
      };

      jest.spyOn(authService, "login").mockRejectedValue(new Error("Invalid credentials"));

      await expect(controller.login(loginDto)).rejects.toThrow("Invalid credentials");
    });
  });
});
