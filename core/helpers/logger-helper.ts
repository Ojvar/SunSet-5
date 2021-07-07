import { config as LoggerConfig, LoggerConfigType } from "@CONFIGS/core/logger";
import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";
import { LoggerType } from "@CORE/helpers/global-data-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { default as _ } from "lodash";
import { basename } from "path";
import { default as Winston, format } from "winston";
import "winston-daily-rotate-file";

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
                let msg: string =
                    typeof info.message == "string"
                        ? info.message
                        : `\n${JSON.stringify(info.message, null, 2)}\n`;

                if (info.stack) {
                    msg += "[STACK TRACE]:\n" + info.stack;
                }

                return `${info.timestamp} ${info.level} [${info.label}]: ${msg}`;
            }
        );

        if (loggerConfigData.useConsole) {
            transports.push(
                new Winston.transports.Console({
                    format: Winston.format.combine(
                        Winston.format.errors({
                            stack: true,
                        }),
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
                format(this.jsonMessageFormatter)(),
                Winston.format.label({
                    label: serverConfigData.appName,
                }),
                Winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                Winston.format.metadata({
                    fillExcept: ["message", "level", "timestamp", "label"],
                }),
                Winston.format.errors({
                    stack: true,
                }),
                Winston.format.colorize(),
                Winston.format.prettyPrint()
            ),
            transports,
        });

        return logger;
    }

    /**
     * Json message formatter
     * @param info {any}
     * @returns {any}
     */
    private jsonMessageFormatter(info: any): any {
        if ("string" != typeof info.message) {
            info.message = JSON.stringify(info.message, null, 2);
        }

        return info;
    }
}
