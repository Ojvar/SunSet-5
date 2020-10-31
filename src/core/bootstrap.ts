import { yellow, green } from "chalk";
import GlobalData from "@Core/Global/global-data";
import EnvModule from "@Core/Modules/env-module";
import Logger from "@Core/Modules/logger-module";
import EventsModule from "./modules/events-module";

/**
 * Bootstrap class
 */
export default class Bootstap {
  /**
   * Boot method
   * @returns Promise<void> Returns promise<void>
   */
  public async boot(): Promise<void> {
    /* Setyp core moduels */
    await this.initCoreModules();

    /* Check for arguments */
    /* Generate route files and .... */

    /* Setup express */
    await this.initExpressModules();

    GlobalData.logger.info(yellow("System booted successfully"));
    GlobalData.events.raise("ServerInit", { readyAt: new Date() });
  }

  /**
   * Initialize core modules
   * @returns Promise<void> Returns promise<void>
   */
  private async initCoreModules(): Promise<void> {
    await this.initEnvData();
    await this.initLogger();
  }

  /**
   * Initialize express modules
   * @returns Promise<void> Returns promise<void>
   */
  private async initExpressModules(): Promise<void> {
    await this.initEvents();
  }

  /**
   * Initialize env-data modules
   * @returns Promise<void> Returns promise<void>
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
   * @returns Promise<void> Returns promise<void>
   */
  private async initLogger(): Promise<void> {
    const logger = Logger.createModule();
    await logger.boot();

    GlobalData.logger = logger;

    this.printLog(logger.getModuleName() + " module");
  }

  /**
   * Init events
   * @returns Promise<void> Returns promise<void>
   */
  private async initEvents(): Promise<void> {
    const events = EventsModule.createModule();
    await events.boot();

    GlobalData.events = events;

    this.printLog(events.getModuleName() + " module");
  }

  /**
   * Print module log
   * @param moduleName string Module name
   * @returns Promise<void> Returns promise<void>
   */
  private printLog(moduleName: string) {
    GlobalData.logger.info(`${yellow(moduleName)} loaded successfully`);
  }
}
