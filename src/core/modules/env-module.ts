import { config } from "dotenv";
import { ICoreModule } from "@/lib/interfaces/core/core-module-interface";
import GlobalMethods from "../global/global-methods";
import BaseModule from "./base-module";

/**
 * EnvModule class
 */
export default class EnvModule extends BaseModule implements ICoreModule {
  /**
   * EnvModule factory
   */
  public static createModule(): EnvModule {
    return new EnvModule();
  }

  /**
   * Get module name
   */
  public getModuleName(): string {
    return "EnvData";
  }

  /**
   * Boot method
   * @param payload object Payload object
   */
  public async boot(payload?: any): Promise<void> {
    await this.loadEnvData();
  }

  /**
   * Loding env-file data
   */
  private async loadEnvData(): Promise<void> {
    const envFile: string = await GlobalMethods.config<string>(
      "core/server",
      "envFile"
    );
    const envFilePath = GlobalMethods.rPath(envFile);

    config({ path: envFilePath });
  }
}
