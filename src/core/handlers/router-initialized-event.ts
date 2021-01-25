import { yellow } from "chalk";
import GlobalData from "@/core/global/global-data";
import IEventHandler from "@Lib/interfaces/core/event-handler-interface";
import RouterManager from "@/core/helpers/router-manager-helper";

/**
 * Server-init handler
 */
export default class ServerInitHandler implements IEventHandler {
  /**
   * Get handler name
   */
  getEventName(): string {
    return "RouterInitialized";
  }

  /**
   * Boot event
   * @param payload any Payload object
   */
  public async register(payload: any): Promise<void> {
    GlobalData.logger.info(
      `${yellow(this.getEventName())} event-handler registered successfully`
    );
  }

  /**
   * Handle method
   * @param payload any Payload data
   */
  public async handle(payload: any): Promise<void> {
    const routerManager: RouterManager = payload as RouterManager;

    /* Create manifest file */
    await routerManager.createManifestFile();
  }
}
