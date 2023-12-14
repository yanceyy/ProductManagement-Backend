import { WinstonModule } from "nest-winston";
import { configFactory } from "../../config/logging.config";

export const createWinstonModule = () => WinstonModule.forRoot(configFactory());
