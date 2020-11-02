import { yellow, green } from "chalk";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import { IBaseRouter } from "@Lib/interfaces/core/base-router-interface";
import IHash from "@Lib/interfaces/hash-interface";
import { RouterItemType } from "@Lib/types/core/router-item-type";

/**
 * Router manager
 */
export default class RouterManager {
  private _routers: IHash<IBaseRouter> = {};

  /**
   * Getter: routers
   * @returns IHash<IBaseRouter> Return routers
   */
  public get routers(): IHash<IBaseRouter> {
    return this._routers;
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
    await files.forEach(async (file) => {
      const RouterModule = await GlobalMethods.loadModule(file);
      const routerModule: IBaseRouter = new RouterModule() as IBaseRouter;

      const routerUrl: string = routerModule.getBaseUrl();
      const routerName: string = routerModule.getName();
      this._routers[routerUrl] = routerModule;

      GlobalData.logger.info(
        `Route ${yellow(routerName)}:${green(routerUrl)} loaded successfully`
      );
    });
  }

  /**
   * Apply routers to an app instance
   * @param app Express.Application Express application instance
   */
  public async apply(app: Express.Application): Promise<void> {
    if (null == app) {
      throw new Error("App is null");
    }

    Object.keys(this.routers).forEach((key) => {
      let router: IBaseRouter = this.routers[key];

      router.apply(app);
    });
  }

  /**
   * Get routers list
   */
  public async getRoutesList(): Promise<IHash<RouterItemType>> {
    let result: IHash<RouterItemType> = {};

    Object.keys(this.routers).forEach((key) => {
      let routes: IHash<RouterItemType> = this.routers[key].getRoutesList();

      result = { ...result, ...routes };
    });

    return result;
  }
}
