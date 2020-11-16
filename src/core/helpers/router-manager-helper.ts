import { writeFileSync } from "fs";
import { dirname } from "path";
import { yellow, green } from "chalk";
import * as Express from "express";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import { IBaseRouter } from "@Lib/interfaces/core/base-router-interface";
import IHash from "@Lib/interfaces/hash-interface";
import { RouterItemType } from "@Lib/types/core/router-item-type";
import { ServerConfigType } from "@Lib/types/config/server-config-type";

/**
 * Router manager
 */
export default class RouterManager {
  private _routers: IHash<IBaseRouter> = {};
  private _routes: IHash<RouterItemType> = {};

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
  public get routes(): IHash<RouterItemType> {
    return this._routes;
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
  private async getRoutesList(): Promise<IHash<RouterItemType>> {
    let result: IHash<RouterItemType> = {};

    Object.keys(this.routers).forEach((key) => {
      let routes: IHash<RouterItemType> = this.routers[key].getRoutesList();

      result = { ...result, ...routes };
    });

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
