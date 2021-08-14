import { config as ServerConfig } from "@CONFIGS/core/server";
import { LoggerType } from "@CORE/helpers/global-data-helper";
import { Request } from "express";
import { lstatSync } from "fs";
import Glob from "glob";
import { basename, extname, join, resolve } from "path";

/**
 * Global methods
 */
export class GlobalMethods {
    private logger: LoggerType = console;

    /**
     * Constructor
     * @param logger {Console} logger
     */
    constructor(logger: LoggerType) {
        this.logger = logger;
    }

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
        return resolve(...path.filter((x: string) => x));
    }

    /**
     * Return files list of a directory
     * @param path string[]
     */
    public static files(
        path: string | Array<string>,
        pattern: string = "**/*",
        removeDirectories: boolean = false,
        useBasePath: boolean = false,
    ): string[] {
        if (Array.isArray(path)) {
            path = join(...path);
        }

        /* Setup distPath */
        const distPath: string = useBasePath ? ServerConfig().basePath : "";

        /* Get directories and files list path */
        path = this.rPath(distPath, path);
        pattern = path + "/" + pattern;
        let result: string[] = Glob.sync(pattern);

        /* Remove directories */
        if (removeDirectories) {
            result = result.filter(
                (file: string) => !lstatSync(file).isDirectory(),
            );
        }

        return result;
    }

    /**
     * Import an specified file
     * @param path string
     */
    public static async importFile(path: string): Promise<any> {
        path = this.rPath(ServerConfig().basePath, path);

        return await import(path);
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
