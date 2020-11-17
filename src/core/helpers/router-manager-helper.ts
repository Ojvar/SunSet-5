import { writeFileSync } from "fs";
import { dirname } from "path";
import { yellow, green } from "chalk";
import * as Express from "express";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import { IBaseRouter } from "@Lib/interfaces/core/base-router-interface";
import IHash from "@Lib/interfaces/hash-interface";
import { RouteKeyType, RouteItemType } from "@Lib/types/core/route-data-type";
import { ServerConfigType } from "@Lib/types/config/server-config-type";
import { ExpressConfigType } from "@Lib/types/config/express-config-type";

/**
 * Router manager
 */
export default class RouterManager {
  private static appConfig: ExpressConfigType = {} as ExpressConfigType;
  private _routers: IHash<IBaseRouter> = {};
  private _routes: IHash<RouteItemType> = {};

  /**
   * Getter: routers
   * @returns IHash<IBaseRouter> Return routers
   */
  public get routers(): IHash<IBaseRouter> {
    return this._routers;
  }
  /**
   * Getter: routes
   * @returns IHash<IBaseRouter> Return routers
   */
  public get routes(): IHash<RouteItemType> {
    return this._routes;
  }

  /**
   * Load static data
   */
  public static async loadStaticData() {
    RouterManager.appConfig = await GlobalMethods.config<ExpressConfigType>(
      "core/express"
    );
  }

  /**
   * Init routers
   */
  public async initRouters(): Promise<void> {
    const routesPath: string = GlobalMethods.rPath(
      __dirname,
      "../../routes/**/*"
    );

    /* Load routers */
    const files: string[] = await GlobalMethods.loadFiles(routesPath);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const RouterModule = await GlobalMethods.loadModule(file);
      const routerModule: IBaseRouter = new RouterModule() as IBaseRouter;

      const routerUrl: string = routerModule.getBaseUrl();
      const routerName: string = routerModule.getName();
      this._routers[routerUrl] = routerModule;

      GlobalData.logger.info(
        `Route ${yellow(routerName)}:${green(routerUrl)} loaded successfully`
      );
    }

    /* Collect routes-data */
    this._routes = await this.getRoutesList();
  }

  /**
   * Apply routers to an app instance
   * @param app Express.Application Express application instance
   */
  public async apply(app: Express.Application): Promise<void> {
    if (null == app) {
      throw new Error("App is null");
    }

    await Object.keys(this.routers).forEach(async (key) => {
      let router: IBaseRouter = this.routers[key];

      router.apply(app);
      GlobalData.logger.info(`Express router ${yellow(key)} applied`);
    });
  }

  /**
   * Get routers list
   */
  private async getRoutesList(): Promise<IHash<RouteItemType>> {
    let result: IHash<RouteItemType> = {};

    Object.keys(this.routers).forEach((key) => {
      let routes: IHash<RouteItemType> = this.routers[key].getRoutesList();

      result = { ...result, ...routes };
    });

    return result;
  }

  /**
   * Get route by name (with parameters)
   * @param name string Route name
   * @param args Array<any> parameters
   */
  public route(name: string, args: IHash<string> = {}): string {
    return RouterManager.getRoute(this.routes[name], args);
  }

  /**
   * Get route path with applied arguments
   */
  public static getRoute(route: RouteItemType, args: IHash<string>): string {
    if (null == route) {
      throw new Error(`Route ${yellow(name)} not found`);
    }

    /* Perpare */
    let keys: Array<RouteKeyType> = route.keys || [];
    let routePath = route.path;
    let baseUrl = route.baseUrl;

    /*  Apply arguments */
    keys.forEach((key) => {
      const newValue: string = (args[key.name] as string) || "";
      const argKey = `/\\:${key.name}${key.optional ? "\\??" : ""}`;
      const regexp = new RegExp(argKey, "g");

      routePath = routePath.replace(regexp, `/${newValue}`);
    });

    /* Generate result */
    let result = `${RouterManager.appConfig.url}${baseUrl}${routePath}`;

    return result;
  }

  /**
   * Create manifest file
   * @param path string Manifest file path
   */
  public async createManifestFile(path?: string): Promise<void> {
    if (!path) {
      const serverConfig: ServerConfigType = await GlobalMethods.config<
        ServerConfigType
      >("core/server");

      path = serverConfig.routerManifest;
    }

    if (!path) {
      throw new Error("route-manifest file path is not specified");
    } else {
      path = GlobalMethods.rPath(path);
    }

    /* Create public directory if not exists */
    await GlobalMethods.createDir(dirname(path));

    /* Write to file */
    writeFileSync(path, JSON.stringify(this.routes, null, 2));
  }
}
