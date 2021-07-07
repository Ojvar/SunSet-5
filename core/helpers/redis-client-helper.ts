import { LoggerType } from "@CORE/helpers/global-data-helper";
import { Callback, ClientOpts, createClient, RedisClient } from "redis";

/**
 * Redis-client helper class
 */
export class RedisClientHelper {
    private logger: LoggerType = console;
    private _client?: RedisClient = undefined;
    private clientOptions: ClientOpts = {};

    /**
     * Ctr
     * @param logger {Console}
     * @param options {ClientOpts}
     */
    constructor(logger: LoggerType, options: ClientOpts = {}) {
        this.logger = logger;
        this.clientOptions = options;
    }

    /**
     * Get redis client
     * @returns RedisClient redis client
     */
    get client(): RedisClient {
        if (undefined == this._client) {
            throw new Error("Client is undefined");
        }

        return this._client;
    }

    /**
     * Connect to server
     */
    public connect(): Promise<void> {
        return new Promise((resolve, reject): void => {
            this._client = createClient(this.clientOptions);

            /* Setup event listeners */
            this.client.on("error", (err) => {
                this.logger.error(JSON.stringify(err));
                reject(err);
            });

            this.client.on("connect", () => {
                this.logger.info("Redis client connected");
            });
            this.client.on("reconnecting", () => {
                this.logger.warn("Redis client reconnecting");
            });
            this.client.on("end", () => {
                this.logger.info("Redis client connection has been closed");
            });

            if (null != this.clientOptions.password) {
                /* Callback function */
                const cb: Callback<any> = (err: Error | null, data: any) => {
                    if (err) {
                        this.logger.error(JSON.stringify(err));
                        reject(err);
                    } else {
                        resolve();
                    }
                };

                this.client.auth(this.clientOptions.password, cb);
            } else {
                resolve();
            }
        });
    }

    /**
     * Disconnect from server
     */
    public disconnect(): void {
        this.client.end();
    }

    /**
     * Change database
     * @param db number|string DB index
     */
    public selectDB(db: number | string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            /* Callback function */
            const cb: Callback<any> = (err: Error | null, data: any) => {
                if (err) {
                    this.logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    resolve(true);
                }
            };

            this.client.select(db, cb);
        });
    }

    /**
     * Run a command - promise based
     */
    public run(cmd: string, ...args: string[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            /* Callback function */
            const cb: Callback<any> = (err: Error | null, data: any) => {
                if (err) {
                    this.logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    resolve(data);
                }
            };

            /* Send command */
            this.client.sendCommand(cmd, args, cb);
        });
    }
}
