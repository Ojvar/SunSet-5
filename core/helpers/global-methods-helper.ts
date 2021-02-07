import { Request } from "express";
import { resolve, basename, extname } from "path";
import Glob from "glob";

export class GlobalMethods {
    /**
     * Check for RequestType
     * @param req Express.Request The request
     */
    public static getRequestType(req: Request): string | boolean {
        return req.accepts(["html", "json"]);
    }

    /**
     * Is in production mode
     */
    public static isProductionMode(): boolean {
        return process.env.NODE_ENV == "production";
    }

    /**
     * Return root-relative path
     * @param path string[]
     */
    public static rPath(...path: string[]) {
        return resolve(...path);
    }

    /**
     * Return files list of a directory
     * @param path string[]
     */
    public static files(path: string, pattern: string = "**/*"): string[] {
        pattern = path + "/" + pattern;

        return Glob.sync(pattern);
    }

    /**
     * Exteact basename of a path
     * @param path string
     */
    public static baseName(path: string, useExt: boolean = true): string {
        let ext = extname(path);
        let fileName = path;

        if (useExt) {
            ext = "";
        }

        return basename(fileName, ext);
    }
}
