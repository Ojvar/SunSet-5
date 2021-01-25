import { yellow } from "chalk";
import GlobalData from "@Core/Global/global-data";
import IEventHandler from "@Lib/interfaces/core/event-handler-interface";
import RedisHelper from "@BE/helpers/redis-helper";
import GlobalHelper from "@BE/helpers/global-helper";

/**
 * Server-init handler
 */
export default class ServerInitHandler implements IEventHandler {
  /**
   * Get handler name
   */
  getEventName(): string {
    return "ServerInit";
  }

  /**
   * Boot event
   * @param payload any Payload object
   */
  public async register(payload: any): Promise<void> {
    GlobalData.logger.info(
      `${yellow(this.getEventName())} event-handler registered successfully`,
    );
  }

  /**
   * Handle method
   * @param payload any Payload data
   */
  public async handle(payload: any): Promise<void> {
    GlobalData.logger.info(
      `${
        yellow(this.getEventName())
      } handler initialized successfully\n\t${payload.readyAt}`,
    );

    this.initServerHelper();
  }

  /**
   * Init server helpers
   */
  private async initServerHelper(): Promise<void> {
    /* Redis helper */
    GlobalHelper.redisHelper = new RedisHelper();
    await GlobalHelper.redisHelper.connect();
  }
}
