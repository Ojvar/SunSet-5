import { yellow, green } from "chalk";
import GlobalData from "@/core/global/global-data";
import EnvModule from "@/core/modules/env-module";
import LoggerModule from "@/core/modules/logger-module";
import DebugModule from "@/core/modules/debug-module";
import EventsModule from "./modules/events-module";
import RouterModule from "./modules/router-module";
import DatabaseModule from "./modules/database-module";
import ExpressModule from "./modules/express-module";

/**
 * Bootstrap class
 */
export default class Bootstap {
  /**
   * Boot method
   * @returns Promise<void> Returns promise<void>
   */
  public async boot(): Promise<void> {
    /* Setup core moduels */
    await this.initCoreModules();

    /* Setup express */
    await this.initApplicationModules();

    GlobalData.logger.info(yellow("System booted successfully"));
    GlobalData.events.raise("ServerInit", { readyAt: new Date() });
  }

  /**
   * Initialize core modules
   * @returns Promise<void> Returns promise<void>
   */
  private async initCoreModules(): Promise<void> {
    await this.initEnvData();
    await this.initDebugger();
    await this.initLogger();
  }

  /**
   * Initialize application modules
   * @returns Promise<void> Returns promise<void>
   */
  private async initApplicationModules(): Promise<void> {
    await this.initEvents();
    await this.initDatabaseModule();
    await this.initRouterModule();
    await this.initExpressModule();
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
   * Initialize debugger
   * @returns Promise<void> Returns promise<void>
   */
  private async initDebugger(): Promise<void> {
    const debugModule = DebugModule.createModule();
    await debugModule.boot();

    GlobalData.debug = debugModule.debugger;

    console.info(
      `${yellow(debugModule.getModuleName())} module loaded successfully`
    );
  }

  /**
   * Initialize logger modules
   * @returns Promise<void> Returns promise<void>
   */
  private async initLogger(): Promise<void> {
    const logger = LoggerModule.createModule();
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
   * Init router
   * @returns Promise<void> Returns promise<void>
   */
  private async initRouterModule(): Promise<void> {
    const router = RouterModule.createModule();
    await router.boot();
    await router.routerManager.createManifestFile();

    GlobalData.router = router;

    this.printLog(router.getModuleName() + " module");
  }

  /**
   * Init express
   * @returns Promise<void> Returns promise<void>
   */
  private async initExpressModule(): Promise<void> {
    const express = ExpressModule.createModule();
    await express.boot();

    GlobalData.express = express;

    this.printLog(express.getModuleName() + " module");
  }

  /**
   * Init Database module
   * @returns Promise<void> Returns promise<void>
   */
  private async initDatabaseModule(): Promise<void> {
    const dbModule = DatabaseModule.createModule();
    await dbModule.boot();

    try {
      GlobalData.dbEngine = dbModule.engine;
    } catch (err) {
      GlobalData.logger.warn(
        yellow("No any database engine has been selected")
      );
    }

    this.printLog(dbModule.getModuleName() + " module");
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
