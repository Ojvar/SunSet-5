import "winston-daily-rotate-file";

import { basename, extname } from "path";

import { GlobalMethods } from "./global-methods-helper";
import { LoggerType } from "./global-data-helper";
import { default as Winston } from "winston";
import { default as _ } from "lodash";
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

        if (config.useConsole) {
            transports.push(
                new Winston.transports.Console({
                    format: Winston.format.simple(),
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
            transports,
        });

        return logger;
    }
}
