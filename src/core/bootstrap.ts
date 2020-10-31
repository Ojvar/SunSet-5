import * as Chalk from "chalk";
import GlobalData from "./global/global-data";
import Logger from "./modules/logger-module";

/**
 * Bootstrap class
 */
export class Bootstap {
  /**
   * Ctr
   */
  constructor() {}

  /**
   * Boot method
   */
  public async boot(): Promise<void> {
    await this.initCoreModules();
  }

  /**
   * Initialize core modules
   */
  private async initCoreModules(): Promise<void> {
    await this.initLogger();
  }

  /**
   * Initialize logger modules
   */
  private async initLogger(): Promise<void> {
    const moduleName: string = Chalk.yellow("Logger");
    GlobalData.logger = Logger.createLogger();

    await GlobalData.logger.boot();
    GlobalData.logger.info(`${moduleName} has been loaded successfully`);
  }
}

/* Export */
export default new Bootstap();
