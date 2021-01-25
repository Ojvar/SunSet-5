import { Logform, createLogger, format, transports } from "winston";
import GlobalMethods from "@Core/Global/global-methods";
import LoggerConfig from "@Config/core/logger-config";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";
import BaseModule from "./base-module";

/**
 * Logger class
 */
export default class LoggerModule extends BaseModule implements ICoreModule {
  private _logger: any = console;
  private logsFilename: string = "";
  private errorFilename: string = "";

  /**
   * Logger factory
   */
  public static createModule(): LoggerModule {
    return new LoggerModule(console);
  }

  /**
   * Get module name
   */
  public getModuleName(): string {
    return "Logger";
  }

  /**
   * Get logger
   */
  public get logger(): any {
    if (null == this._logger) {
      throw new Error("Logger is null");
    }

    return this._logger;
  }

  /**
   * Set logger
   */
  public set logger(value: any) {
    if (null == value) {
      throw new Error("Logger is null");
    }

    this._logger = value;
  }

  /**
   * Ctr
   */
  constructor(logger: any = console) {
    super();
    this._logger = logger;
  }

  /**
   * Setup variables
   */
  public async boot(payload?: object): Promise<void> {
    this.setupVariables();
    this.initWinstonLogger();
  }

  /**
   * Setup variables
   */
  private setupVariables(): void {
    let logPath = LoggerConfig.logFolder;
    GlobalMethods.createDir(logPath);

    this.logsFilename = GlobalMethods.rPath(logPath, "logs.log");
    this.errorFilename = GlobalMethods.rPath(logPath, "errors.log");
  }

  /**
   * Colorize the output
   * @param msg Incoming message
   * @returns String
   */
  private colorPrintFnc(msg: Logform.TransformableInfo): string {
    const colorizer: Logform.Colorizer = format.colorize();

    return (
      colorizer.colorize(msg.level, `[${msg.level}]`) +
      `\t${msg.timestamp}\n\t${msg.message}`
    );
  }

  /**
   * Return RAW format of msg
   * @param msg Incoming message
   * @returns String
   */
  private rawPrintFnc(msg: Logform.TransformableInfo): string {
    return `[${msg.level}]\t${msg.timestamp}\n\t${msg.message}`;
  }

  /**
   * Init winston logger
   */
  private initWinstonLogger(): void {
    /* Add to log file  */
    const logger = createLogger({
      level: "silly",

      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.printf(this.rawPrintFnc)
      ),

      transports: [
        new transports.File({
          filename: this.errorFilename,
          level: "error",
        }),
        new transports.File({ filename: this.logsFilename }),
      ],
    });

    /* Print to console */
    if (!GlobalMethods.isProductionMode()) {
      logger.add(
        new transports.Console({
          level: "silly",
          format: format.combine(
            format.timestamp(),
            format.simple(),
            format.printf(this.colorPrintFnc)
          ),
        })
      );
    }

    /* Set logger engine */
    this.logger = logger;
  }

  /**
   *  Log a message
   * @param type String Log type
   * @param log String Log message
   * @param tag String Log tag
   */
  public log(type: string, log: string, tag?: string): string {
    if (tag) {
      log = `${tag}\n\t${log}`;
    }

    /* Log message */
    if (this.logger[type]) {
      this.logger[type](log);
    } else {
      throw Error(`LOG-TYPE ${type} not found!`);
    }

    return log;
  }

  /**
   *  Log an info message
   * @param log String Log message
   * @param tag String Log tag
   */
  public info(log: string, tag?: string): string {
    return this.log("info", log, tag);
  }

  /**
   *  Log a debug message
   * @param log String Log message
   * @param tag String Log tag
   */
  public debug(log: string, tag?: string): string {
    return this.log("debug", log, tag);
  }

  /**
   *  Log a warning message
   * @param log String Log message
   * @param tag String Log tag
   */
  public warn(log: string, tag?: string): string {
    return this.log("warn", log, tag);
  }

  /**
   *  Log an error message
   * @param log String Log message
   * @param tag String Log tag
   */
  public error(log: string, tag?: string): string {
    return this.log("error", log, tag);
  }

  /**
   *  Log an http message
   * @param log String Log message
   * @param tag String Log tag
   */
  public http(log: string, tag?: string): string {
    return this.log("http", log, tag);
  }

  /**
   *  Log an verbose message
   * @param log String Log message
   * @param tag String Log tag
   */
  public verbose(log: string, tag?: string): string {
    return this.log("verbose", log, tag);
  }

  /**
   *  Log an silly message
   * @param log String Log message
   * @param tag String Log tag
   */
  public silly(log: string, tag?: string): string {
    return this.log("silly", log, tag);
  }
}
