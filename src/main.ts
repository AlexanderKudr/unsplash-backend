import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { auth, images } from "./routes";
import { swagger } from "./docs";

const app = express();


const setupApp = (app: Express) => {
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.static("public"));


  swagger(app);
  app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};

const setupRoutes = (app: Express) => {
  auth(app);
  images(app);
};

setupApp(app);
setupRoutes(app);
