import ConnectRedis from "connect-redis";
import ExpressSession from "express-session";
import { GlobalData } from "../helpers/global-data-helper";
import { ISessionDriver } from "../middlewares/core/002-express-session-middleware";
import { RedisClientHelper } from "../helpers/redis-client-helper";
import { Store } from "express-session";

/**
 * Redis session driver
 */
export default class RedisSessionDriver implements ISessionDriver {
    /**
     * Setup session
     * @param session {ExpressSession} Session
     */
    public async setup(payload: any): Promise<Store> {
        /* Prepare redis-client */
        const redisClient: RedisClientHelper = new RedisClientHelper(
            GlobalData.logger
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
