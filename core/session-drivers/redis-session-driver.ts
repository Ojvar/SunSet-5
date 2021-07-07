import { config as RedisConfig } from "@CONFIGS/core/redis";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { RedisClientHelper } from "@CORE/helpers/redis-client-helper";
import { ISessionDriver } from "@CORE/middlewares/core/003-express-session-middleware";
import ConnectRedis from "connect-redis";
import ExpressSession, { Store } from "express-session";

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
