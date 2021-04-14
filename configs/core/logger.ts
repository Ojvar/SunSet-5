import { default as DailyRotateFile } from "winston-daily-rotate-file";
import { Hash } from "@Lib/types/hash-type";

/**
 * Export config
 */
export const config = (): LoggerConfigType => {
    const isProduction = process.env.NODE_ENV == "production";

    return {
        logFolder: process.env.LOG_DIR || "logs",
        logLevels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6,
        },
        useConsole: "true" == (process.env.LOG_CONSOLE || "true"),
        useFile: "true" == (process.env.LOG_FILE || isProduction.toString()),
        rotateFile: {
            filename: process.env.LOG_ROTATE_FILENAME || "log-%DATE%.log",
            datePattern: process.env.LOG_ROTATE_DATE_PATTERN || "YYYY-MM-DD-HH",
            zippedArchive:
                "true" == (process.env.LOG_ROTATE_ZIPPED_ARCHIVE || "true"),
            maxSize: process.env.LOG_ROTATE_MAX_SIZE || "20m",
            maxFiels: process.env.LOG_ROTATE_MAX_FILES || "14d",
        } as DailyRotateFile.DailyRotateFileTransportOptions,
    } as LoggerConfigType;
};

/**
 * Logger config type
 */
export type LoggerConfigType = {
    logFolder: string;
    logLevels: Hash<number>;
    rotateFile: DailyRotateFile.DailyRotateFileTransportOptions;
    useConsole: boolean;
    useFile: boolean;
};
