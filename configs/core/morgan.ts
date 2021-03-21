import { RotatingFileStream, createStream } from "rotating-file-stream";

import { resolve } from "path";

/* 
    NOTES:
        Morgan pre-defined formats
            combined
            common
            dev
            short
            tiny
*/

/**
 * Get stream function
 */
function getStreamFunction(): RotatingFileStream | null {
    if ("true" != process.env.MORGAN_USE_LOG) {
        return null;
    }

    return createStream("access.log", {
        interval: process.env.MORGAN_ROTATION_INTERVAL || "1d",
        path: resolve("./logs/morgan"),
    });
}

/**
 * Export config
 */
export const config: MorganConfigType = {
    defaultFormat: process.env.MORGAN_FORMAT || "sunset-format",
    stream: getStreamFunction(),
    formatFuction:
        process.env.MORGAN_FORMAT ||
        (process.env.NODE_ENV == "production" ? "combined" : "dev"),

    /* Skip function */
    // skip: function (req, res) { return res.statusCode < 400 }
} as MorganConfigType;

/**
 * Export config
 */
export type MorganConfigType = {
    defaultFormat: string;
    stream: RotatingFileStream | null;
    formatFuction: string;
    skip: Function | null | undefined;
};
