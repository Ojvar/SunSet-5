import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import Express from "express";

/**
 * Default export
 */
export default class CORSMiddleware implements MiddlewareInterface {
    private _expressHelper?: ExpressHelper;

    /**
     * Setup function
     * @param payload {any} Payload data
     */
    async setup(payload?: any): Promise<void> {
        this._expressHelper = payload as ExpressHelper;
    }

    /**
     * Check function
     * @param payload {any} Payload data
     */
    public async check(payload?: any): Promise<void> {
        const app: Express.Application = this._expressHelper
            ?.App as Express.Application;

        const CORS = (await import("cors")).default;
        const config: ServerConfigType = ServerConfig();

        app.use(
            CORS({
                origin: [config.serverUrl],
            })
        );
    }
}
