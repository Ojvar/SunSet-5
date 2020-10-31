import { yellow, green } from "chalk";
import GlobalData from "@Core/Global/global-data";
import EnvModule from "@Core/Modules/env-module";
import Logger from "@Core/Modules/logger-module";

/**
 * Bootstrap class
 */
export class Bootstap {
  /**
   * Boot method
   */
  public async boot(): Promise<void> {
    await this.initCoreModules();

    GlobalData.logger.info(green("System booted successfully"));
  }

  /**
   * Initialize core modules
   */
  private async initCoreModules(): Promise<void> {
    await this.initEnvData();
    await this.initLogger();
  }

  /**
   * Initialize env-data modules
   */
  private async initEnvData(): Promise<void> {
    const envModule = EnvModule.createModule();
    await envModule.boot();

    console.info(
      `${yellow(envModule.getModuleName())} module loaded successfully`
    );
  }

  /**
   * Initialize logger modules
   */
  private async initLogger(): Promise<void> {
    const logger = Logger.createModule();
    await logger.boot();

    GlobalData.logger = logger;

    this.printModuleLog(logger.getModuleName());
  }

  /**
   * Print module log
   * @param moduleName string Module name
   */
  private printModuleLog(moduleName: string) {
    GlobalData.logger.info(`${yellow(moduleName)} module loaded successfully`);
  }
}

/* Export */
export default new Bootstap();
