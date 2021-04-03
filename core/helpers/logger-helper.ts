import "winston-daily-rotate-file";

import { GlobalMethods } from "./global-methods-helper";
import { LoggerType } from "./global-data-helper";
import { config as ServerConfig } from "@CONFIGS/core/server";
import { default as Winston } from "winston";
import { default as _ } from "lodash";
import { basename } from "path";
import { config } from "@CONFIGS/core/logger";

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

        if (config.useConsole) {
            transports.push(
                new Winston.transports.Console({
                    format: Winston.format.combine(
                        Winston.format.colorize(),
                        logFormat
                    ),
                })
            );
        }

        if (config.useFile) {
            const logFileName: string = basename(
                config.rotateFile.filename || "logs.log"
            );

            transports.push(
                new Winston.transports.DailyRotateFile(
                    _.merge({}, config.rotateFile, {
                        filename: GlobalMethods.rPath(
                            config.logFolder,
                            logFileName
                        ),
                        level: "silly",
                    })
                )
            );

            transports.push(
                new Winston.transports.DailyRotateFile(
                    _.merge({}, config.rotateFile, {
                        filename: GlobalMethods.rPath(
                            config.logFolder,
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
                    label: ServerConfig.appName,
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
