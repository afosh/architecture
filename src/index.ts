import Server from "./server/server";
import express from "express";
import Logger from "./infrastructure/logger";
import Config from "./infrastructure/configurations";

const AppLogger = new Logger();

const expressApp = express();

const server = new Server(expressApp, []);

server.listen(Config.PORT, () => {
  AppLogger.info(
    "System",
    "Connecting to PORT:" + Config.PORT + " App Version: " + Config.VERSION
  );
});

process.on("SIGINT", (err) => {
  AppLogger.warn("System", "System is shutting down.");
});
