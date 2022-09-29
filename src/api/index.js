import { Router } from "express";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";
import { getConfigFile } from "medusa-core-utils";

export default (rootDirectory) => {
  const app = Router();

  const { configModule } = getConfigFile(rootDirectory, "medusa-config");
  const { projectConfig } = configModule;

  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };
  return app;
};
