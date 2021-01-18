import GlobalMethods from "@Core/Global/global-methods";
import RedisClientHelper from "@Core/Helpers/redis-client-helper";
import { ClientOpts } from "redis";

/**
 * Redis client
 */
export default class RedisHelper {
    private _redisClient?: RedisClientHelper = undefined;

    /**
     * Getter: _redisClient
     */
    public get redisClient(): RedisClientHelper {
        return this._redisClient as RedisClientHelper;
    }

    /**
     * Connect
     */
    public async connect(): Promise<void> {
        const config: ClientOpts = await GlobalMethods.config("core/redis");

        if (!config.host) {
            return;
        }

        this._redisClient = new RedisClientHelper(config);
        await this.redisClient.connect();
    }

    /**
     * DisConnect
     */
    public async disconnect(): Promise<void> {
        await this.redisClient.disconnect();
    }

    /**
     * DisConnect
     */
    public async runCmd(cmd: string, ...args: string[]): Promise<any> {
        return this.redisClient.run(cmd, ...args);
    }
}
