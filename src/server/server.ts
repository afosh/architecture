import express, { Application } from "express";
import IWebController from "./interfaces";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import Logger from "../infrastructure/logger";
import { CreateID } from "../utils";

export default class Server {
  server: Application;
  logger: Logger;
  constructor(
    express: Application,
    controllers: IWebController[],
    logger: Logger = new Logger()
  ) {
    this.server = express;
    this.logger = logger;
    // Sentry.init({
    //   environment: config.NODE_ENV,
    //   release: "pass-ticket-api@" + config.VERSION,
    //   dsn: config.SENTRY_DSN,
    //   integrations: [
    //     // enable HTTP calls tracing
    //     new Sentry.Integrations.Http({ tracing: true }),
    //     // enable Express.js middleware tracing
    //     new Sentry.Integrations.Express({ app: express }),
    //     // new Tracing.Integrations.Express({app: express}), Tracing.Integrations.Express() is Depricated, use Sentry.Integrations.Express() instead
    //   ],

    //   // Set tracesSampleRate to 1.0 to capture 100%
    //   // of transactions for performance monitoring.
    //   // We recommend adjusting this value in production
    //   tracesSampleRate: 0.02,
    // });
    this.init(controllers);
  }
  private init(controllers: IWebController[]) {
    // this.server.use(Sentry.Handlers.requestHandler());
    // this.server.use(Sentry.Handlers.tracingHandler());

    this.initMiddlewares();
    this.registerControllers(controllers);
    // this.server.use(Sentry.Handlers.errorHandler());
    this.initErrorHandler();
  }

  private initMiddlewares() {
    this.server.use((req, res, next) => {
      const RequestId = CreateID();
      this.logger.info("System", "Processing Request: " + RequestId);
      res.locals.meta = {
        requestId: RequestId,
      };
      next();
    });
    // this.server.use(Fingerprint());
    // this.server.use(VersioningMiddleware);
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(
      morgan("combined", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
      })
    );
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(compression());

    this.server.get("/ping", (req, res) => res.status(200).send("pong"));

    this.server.get("/", async (req, res) => {
      res.send(`PASS_API_VERSION:`);
    });
  }
  private registerControllers(controllers: IWebController[]) {
    controllers.forEach((controller: IWebController) => {
      this.server.use("/api", controller.router);
    });
    this.server.get("/error/test", (req, res, next) => {
      throw new Error(`UPDATE SENTRY ERROR (${new Date()})`);
    });
  }
  private initErrorHandler(): void {
    //    this.server.use();
    //  this.server.use();
  }

  public listen(port: number, cb?: () => void) {
    this.server.listen(port, cb);
  }
}
