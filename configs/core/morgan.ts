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
export const config = (): MorganConfigType => {
    return {
        defaultFormat: process.env.MORGAN_FORMAT || "sunset-format",
        stream: getStreamFunction(),
        formatFuction:
            process.env.MORGAN_FORMAT ||
            (process.env.NODE_ENV == "production" ? "combined" : "dev"),

        /* Skip function */
        // skip: function (req, res) { return res.statusCode < 400 }
    } as MorganConfigType;
};

/**
 * Export config type
 */
export type MorganConfigType = {
    defaultFormat: string;
    formatFuction: string;
    skip: Function | null | undefined;
    stream: RotatingFileStream | null;
};
