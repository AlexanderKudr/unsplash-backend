import * as dotenv from "dotenv";
import { privateKey, publicKey } from "./keys";

dotenv.config();
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, PORT } = process.env;
const config = {
  port: PORT,
  corsOptions: { origin: "*", credentials: true },
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  },
  publicKey: publicKey,
  privateKey: privateKey,
};

export { config };
