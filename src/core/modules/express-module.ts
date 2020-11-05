import BaseModule from "./base-module";
import ExpressHelper from "@Core/Helpers/express-helper";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";

/**
 * ExpressModule class
 */
export default class ExpressModule extends BaseModule implements ICoreModule {
  /**
   * Create module factory
   */
  public static createModule(): ExpressModule {
    return new ExpressModule();
  }

  /**
   * Get module name
   * @returns string Returns module name
   */
  public getModuleName(): string {
    return "Express";
  }

  /**
   * Boot method
   * @param payload any Payload
   */
  public async boot(payload?: any): Promise<void> {
    const expresHelper: ExpressHelper = new ExpressHelper();

    await expresHelper.init();
  }
}
