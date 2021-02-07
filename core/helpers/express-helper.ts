import Express from "express";
import ServerConfig from "@CONFIGS/core/server";

/**
 * Express helper
 */
export class ExpressHelper {
    private logger: Console = console;
    private app?: Express.Application;
    private config: ExpressConfigType = ServerConfig;

    /**
     * Get app instance
     */
    public get App(): Express.Application {
        return this.app as Express.Application;
    }

    /**
     * Get InternalUrl
     */
    public get internalUrl(): string {
        return `${this.config.proto}://${this.config.host}:${this.config.port}`;
    }

    /**
     * Get ExternalUrl
     */
    public get externalUrl(): string {
        return `${this.config.serverUrl}`;
    }

    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        this.logger = logger;
    }

    /**
     * Init helper
     */
    public async init(payload?: any): Promise<void> {
        this.app = Express();
    }

    /**
     * Listen
     */
    public async listen(): Promise<void> {
        this.app?.listen(this.config.port, this.config.host, () => {
            this.logger.info(`
Server started successfully
    INTERNAL URL   ${this.internalUrl}
    EXTERNAL URL   ${this.externalUrl}
`);
        });
    }
}

/**
 * Express config type
 */
export type ExpressConfigType = {
    proto: string;
    port: number;
    host: string;
    serverUrl: string;
};
