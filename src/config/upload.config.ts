import { registerAs } from "@nestjs/config";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
export default registerAs("upload", () => ({
  destination: "upload",
  filename: (_, file, callback) => {
    const filepath = Date.now() + "-" + uuidv4() + extname(file.originalname);
    callback(null, filepath);
  },
}));
