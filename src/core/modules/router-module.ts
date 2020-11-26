import GlobalData from "@/core/global/global-data";
import RouterManager from "@/core/helpers/router-manager-helper";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";
import BaseModule from "./base-module";

/**
 * Router module
 */
export default class RouterModule extends BaseModule implements ICoreModule {
  private _routerManager: RouterManager = new RouterManager();

  /**
   * Router factory
   */
  public static createModule(): RouterModule {
    return new RouterModule();
  }

  /**
   * Getter: routerManager
   */
  public get routerManager(): RouterManager {
    return this._routerManager;
  }

  /**
   * Get router name
   * @returns string Get the module name
   */
  public getModuleName(): string {
    return "Router";
  }

  /**
   * Boot module
   * @param payload any Payload object
   */
  public async boot(payload?: any): Promise<void> {
    await RouterManager.loadStaticData();
    await this._routerManager.initRouters();

    GlobalData.events.raise("RouterInitialized", this._routerManager);
  }
}
