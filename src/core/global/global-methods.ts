import _ from "lodash";
import { resolve, extname } from "path";
import { existsSync, readFileSync } from "fs";
import * as Glob from "glob";
import * as Ora from "ora";
import * as MkDirP from "mkdirp";
import Express, { NextFunction } from "express";
import { CsrfConfigType } from "@/lib/types/core/csrf-config-type";
import { ServerConfigType } from "@/lib/types/core/server-config-type";

/**
 * Global methods
 */
export default class GlobalMethods {
  public static readonly C_ENV_PRODUCTION: string = "production";

  private static spinner: Ora.Ora;
  private static serverConfig: ServerConfigType;

  /**
   * Load module
   * @param path string Module path
   */
  public static async loadModule<T = any>(path: string): Promise<T> {
    const RawModule: any = await import(GlobalMethods.rPath(path));
    const ModuleData: T = RawModule.default as T;

    return ModuleData;
  }

  /**
   * Return relative path by input-paraemters
   * @param args string[] Arguments
   */
  public static rPath(...args: string[]): string {
    return resolve(...args);
  }

  /**
   * Return development mode
   */
  public static isProductionMode(): boolean {
    return process.env.NODE_ENV === GlobalMethods.C_ENV_PRODUCTION;
  }

  /**
   * Load all files from a specified location
   *  User can filter by regexp
   * @param pattern String Folder path
   * @param optinos Glob.IOoptions options
   * @param filterFnc Function Filter function
   */
  public static async loadFiles(
    pattern: string,
    options?: Glob.IOptions,
    filterFnc: Function = this.filterIgnoredFiles
  ): Promise<string[]> {
    let files: string[] = Glob.sync(pattern, options);

    if (null !== filterFnc) {
      files = await filterFnc(files);
    }

    return files;
  }

  /**
   *
   * @param text string Loading text
   * @param color
   */
  public static showLoading(text: string, color?: Ora.Color): void {
    if (!GlobalMethods.spinner) {
      GlobalMethods.spinner = Ora(text);
    } else {
      GlobalMethods.spinner.text = text;
    }

    if (color) {
      GlobalMethods.spinner.color = color;
    }

    GlobalMethods.spinner.start();
  }

  /**
   * Stop loading
   */
  public static stopLoading(): void {
    if (!GlobalMethods.spinner) {
      return;
    }

    GlobalMethods.spinner.stop();
  }

  /**
   * Read a file
   * @param filename string File name
   */
  public static readFile(filename: string): object {
    let result: object = readFileSync(GlobalMethods.rPath(filename));

    return result;
  }

  /**
   * Read a config file
   * @param config string Config filename
   * @param keyPath string Key path
   */
  public static async config<T>(config: string, keyPath?: string): Promise<T> {
    /* fix config filename */
    if (!config.endsWith("config")) {
      config += "-config";
    }

    let result: T;
    let path = GlobalMethods.rPath(__dirname, `@Config/${config}`);
    result = await GlobalMethods.loadModule<T>(path);

    if (keyPath) {
      result = _.get(result, keyPath) as T;
    }

    return result;
  }

  /**
   * Check for Ignore route form CSRF  or not
   * @param req Express.Request The request
   */
  public static async useCSRF(req: Express.Request): Promise<Function> {
    const csrfRules: CsrfConfigType = await GlobalMethods.config<
      CsrfConfigType
    >("core/csrf-rules");

    return function (
      req: Express.Request,
      res: Express.Response,
      next: NextFunction
    ): boolean {
      const index: number = csrfRules.ignoreList.findIndex((rule: string) =>
        req.originalUrl.match(new RegExp(rule))
      );

      return index != -1;
    };
  }

  /**
   * Check for RequestType
   * @param req Express.Request The request
   */
  public static getRequestType(req: Express.Request): string | boolean {
    return req.accepts(["html", "json"]);
  }

  /**
   * Create directory
   * @param path string Dir path
   */
  public static async createDir(path: string): Promise<void> {
    if (!existsSync(path)) {
      await MkDirP(path);
    }
  }

  /**
   * Sleep function
   * @param timeout number Timeout
   */
  public static sleep(timeout: number): Promise<void> {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(), timeout)
    );
  }

  /**
   * Filter ignored files
   * @param files string[] Filter ignored files
   */
  public static async filterIgnoredFiles(files: string[]): Promise<string[]> {
    if (null == GlobalMethods.serverConfig) {
      await GlobalMethods.loadServerConfig();
    }

    files = files.filter((file: string): boolean => {
      const ext = extname(file);

      return GlobalMethods.serverConfig.acceptableTypes.indexOf(ext) > -1;
    });

    return files;
  }

  /**
   * Load Server-Config file
   */
  private static async loadServerConfig(): Promise<void> {
    GlobalMethods.serverConfig = await GlobalMethods.config("core/server");
  }
}
