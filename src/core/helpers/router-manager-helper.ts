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

    /* Load router */
    const files: string[] = await GlobalMethods.loadFiles(routesPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const RouterModule = await GlobalMethods.loadModule(file);
      const routerModule: IBaseRouter = new RouterModule() as IBaseRouter;

      const routerName: string = routerModule.getBaseUrl();
      this._routers[routerName] = routerModule;
    }
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
