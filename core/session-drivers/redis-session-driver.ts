import { config as RedisConfig } from "@CONFIGS/core/redis";
import ConnectRedis from "connect-redis";
import ExpressSession, { Store } from "express-session";
import { GlobalData } from "../helpers/global-data-helper";
import { RedisClientHelper } from "../helpers/redis-client-helper";
import { ISessionDriver } from "../middlewares/core/003-express-session-middleware";

/**
 * Redis session driver
 */
export default class RedisSessionDriver implements ISessionDriver {
    /**
     * Setup session
     * @param session {ExpressSession} Session
     */
    public async setup(payload: any): Promise<Store> {
        const config = RedisConfig();

        /* Prepare redis-client */
        const redisClient: RedisClientHelper = new RedisClientHelper(
            GlobalData.logger,
            config
        );
        await redisClient.connect();

        /* Prepare redis-sessoin */
        const RedisStore: ConnectRedis.RedisStore = ConnectRedis(
            ExpressSession
        );
        return new RedisStore({
            client: redisClient.client,
        });
    }
}
