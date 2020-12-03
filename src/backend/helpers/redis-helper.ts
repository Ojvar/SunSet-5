import GlobalMethods from "@Core/Global/global-methods";
import RedisClientHelper from "@Core/Helpers/redis-client-helper";
import { ClientOpts } from "redis";

/**
 * Redis client
 */
export default class RedisHelper {
  private static _redisClient?: RedisClientHelper = undefined;

  /**
   * Getter: _redisClient
   */
  public static get redisClient(): RedisClientHelper {
    return RedisHelper._redisClient as RedisClientHelper;
  }

  /**
   * Connect
   */
  public static async connect(): Promise<void> {
    const config: ClientOpts = await GlobalMethods.config("core/redis");

    if (!config.host) {
      return;
    }

    RedisHelper._redisClient = new RedisClientHelper(config);
    await RedisHelper.redisClient.connect();
  }

  /**
   * DisConnect
   */
  public static async disconnect(): Promise<void> {
    await RedisHelper.redisClient.disconnect();
  }

  /**
   * DisConnect
   */
  public static async runCmd(
    cmd: string,
    ...args: (string)[]
  ): Promise<any> {
    return RedisHelper.redisClient.run(cmd, ...args);
  }
}
