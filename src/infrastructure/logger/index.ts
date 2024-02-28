import createLogger from "logging";

export interface ILogger {
  info(feature: string, message: string | any): void;
  warn(feature: string, message: string | any): void;
  error(feature: string, message: string | any): void;
  log(feature: string, message: string | any): void;
}

export default class Logger implements ILogger {
  info(feature: string, message: any): void {
    const logger = createLogger(feature);
    logger.info(message);
  }
  warn(feature: string, message: any): void {
    const logger = createLogger(feature);
    logger.warn(message);
  }

  error(feature: string, message: any): void {
    const logger = createLogger(feature);
    logger.error(message);
  }
  log(feature: string, message: any): void {
    const logger = createLogger(feature);
    logger.debug(message);
  }
}
