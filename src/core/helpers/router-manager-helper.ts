import { writeFileSync } from "fs";
import { dirname } from "path";
import { yellow, green } from "chalk";
import * as Express from "express";
import GlobalData from "@/core/global/global-data";
import GlobalMethods from "@/core/global/global-methods";
import { IBaseRouter } from "@Lib/interfaces/core/base-router-interface";
import IHash from "@Lib/interfaces/hash-interface";
import { RouteItemType, RouteFileType } from "@Lib/types/core/route-data-type";
import { ServerConfigType } from "@Lib/types/config/server-config-type";
import { ExpressConfigType } from "@Lib/types/config/express-config-type";
import RouterHelper from "./route-helper";

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

    const keys: string[] = Object.keys(this.routers);
    for (let i: number = 0; i < keys.length; ++i) {
      const key: string = keys[i];
      let router: IBaseRouter = this.routers[key];

      router.apply(app);
      GlobalData.logger.info(`Express router ${yellow(key)} applied`);
    }
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
    return RouterHelper.getRoute(
      this.routes[name],
      args,
      RouterManager.appConfig.url
    );
  }

  /**
   * Create manifest file
   * @param path string Manifest file path
   */
  public async createManifestFile(path?: string): Promise<void> {
    if (!path) {
      const serverConfig: ServerConfigType = await GlobalMethods.config<ServerConfigType>(
        "core/server"
      );

      path = serverConfig.routerManifest;
    }

    if (!path) {
      throw new Error("route-manifest file path is not specified");
    } else {
      path = GlobalMethods.rPath(path);
    }

    /* Create public directory if not exists */
    await GlobalMethods.createDir(dirname(path));

    /* Create content */
    const content: RouteFileType = {
      url: RouterManager.appConfig.url,
      routes: this.routes,
    };

    /* Write to file */
    writeFileSync(path, JSON.stringify(content, null, 2));
  }
}
