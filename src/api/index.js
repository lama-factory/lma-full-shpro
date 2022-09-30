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

  app.post(
    "/shippy/shipment",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      const shippyService = req.scope.resolve("shippyFulfillmentService");
      const eventBus = req.scope.resolve("eventBusService");
      const logger = req.scope.resolve("logger");

      const secret = shippyService.options_.webhook_secret;

      if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Basic ") === -1
      ) {
        return res
          .status(401)
          .json({ message: "Missing Authorization Header" });
      }

      // verify auth credentials
      const base64Credentials = req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [username, password] = credentials.split(":");
      if (password === secret) {
        eventBus.emit("shippy.shipment", {
          headers: req.headers,
          body: JSON.parse(req.body),
        });
      } else {
        logger.warn("Shippy webhook could not be authenticated");
      }

      res.sendStatus(200);
    }
  );
  return app;
};
