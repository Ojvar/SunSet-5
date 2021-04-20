import "winston-daily-rotate-file";

import { config as LoggerConfig, LoggerConfigType } from "@CONFIGS/core/logger";
import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";

import { GlobalMethods } from "./global-methods-helper";
import { LoggerType } from "./global-data-helper";
import { default as Winston } from "winston";
import { default as _ } from "lodash";
import { basename } from "path";

/**
 * Logger helper class
 */
export class LoggerHelper {
    private logger: LoggerType = console;

    /**
     * Ctr
     * @param logger {LoggerType}
     * @param options {ClientOpts}
     */
    constructor(logger: LoggerType) {
        this.logger = logger;
    }

    /**
     * Initialize logger
     */
    public async initLogger(): Promise<Winston.Logger> {
        const serverConfigData: ServerConfigType = ServerConfig();
        const loggerConfigData: LoggerConfigType = LoggerConfig();

        const transports = [];

        const logFormat: Winston.Logform.Format = Winston.format.printf(
            (info) => {
                const msg: string =
                    typeof info.message == "string"
                        ? info.message
                        : `\n${JSON.stringify(info.message, null, 2)}\n`;

                return `${info.timestamp} ${info.level} [${info.label}]: ${msg}`;
            }
        );

        if (loggerConfigData.useConsole) {
            transports.push(
                new Winston.transports.Console({
                    format: Winston.format.combine(
                        Winston.format.colorize(),
                        logFormat
                    ),
                })
            );
        }

        if (loggerConfigData.useFile) {
            const logFileName: string = basename(
                loggerConfigData.rotateFile.filename || "logs.log"
            );

            transports.push(
                new Winston.transports.DailyRotateFile(
                    _.merge({}, loggerConfigData.rotateFile, {
                        filename: GlobalMethods.rPath(
                            loggerConfigData.logFolder,
                            logFileName
                        ),
                        level: "silly",
                    })
                )
            );

            transports.push(
                new Winston.transports.DailyRotateFile(
                    _.merge({}, loggerConfigData.rotateFile, {
                        filename: GlobalMethods.rPath(
                            loggerConfigData.logFolder,
                            "error-" + logFileName
                        ),
                        level: "error",
                    })
                )
            );
        }

        const logger = Winston.createLogger({
            level: process.env.NODE_ENV === "production" ? "info" : "silly",
            format: Winston.format.combine(
                Winston.format.label({
                    label: serverConfigData.appName,
                }),
                Winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                Winston.format.metadata({
                    fillExcept: ["message", "level", "timestamp", "label"],
                })
            ),
            transports,
        });

        return logger;
    }
}
