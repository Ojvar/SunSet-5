import { yellow } from "chalk";
import { Application } from "express";
import * as Session from "express-session";
import * as ConnectRedis from "connect-redis";
import { SessionConfigType } from "@Lib/types/config/session-config-type";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import RedisClientHelper from "./redis-client-helper";

/**
 * Events class
 */
export default class SessionHelper {
  /**
   * Initialize Session
   * @param app Application
   */
  public async init(app: Application): Promise<void> {
    const config: SessionConfigType = (await GlobalMethods.config(
      "core/session"
    )) as SessionConfigType;

    /* Init Session */
    let sessionStore: Session.Store | Session.MemoryStore;

    switch (config.store) {
      case "redis":
        sessionStore = await this.createRedisSessionStore();
        break;

      case "memory":
      default:
        sessionStore = new Session.MemoryStore();
        break;
    }

    /* Setup session */
    config.options.store = sessionStore;

    /* Setup application */
    app.use(Session(config.options));
  }

  /**
   * Create a Redis-Session Store
   */
  private async createRedisSessionStore(): Promise<Session.Store> {
    /* Intialize redis-client */
    const redisHelper: RedisClientHelper = new RedisClientHelper();
    await redisHelper.connect();

    /* Init RedisStore */
    let RedisStore = ConnectRedis(Session);
    const redisStore: ConnectRedis.RedisStore = new RedisStore({
      client: redisHelper.client,
    });

    return redisStore;
  }
}
