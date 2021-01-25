import * as Debug from "debug";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";
import BaseModule from "./base-module";
import GlobalMethods from "@/core/global/global-methods";
import { DebugConfigType } from "@Lib/types/config/debug-config-type";

/**
 * Logger class
 */
export default class DebugModule extends BaseModule implements ICoreModule {
  private _debugger?: Debug.Debugger = undefined;

  /**
   * Logger factory
   */
  public static createModule(): DebugModule {
    return new DebugModule();
  }

  /**
   * Get module name
   */
  public getModuleName(): string {
    return "Debug";
  }

  /**
   * Get logger
   */
  public get debugger(): Debug.Debugger {
    if (undefined == this._debugger) {
      throw new Error("Debugger is undefined");
    }

    return this._debugger;
  }

  /**
   * Setup variables
   */
  public async boot(payload?: any): Promise<void> {
    const config: DebugConfigType = await GlobalMethods.config("core/debug");

    this._debugger = Debug(config.name || "sunset42");
  }
}
