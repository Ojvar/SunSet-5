import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";
import Express from "express";

/**
 * Default export
 */
export default class BodyParserMiddleware implements MiddlewareInterface {
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

        const config: ServerConfigType = ServerConfig();

        // parse application/x-www-form-urlencoded
        app.use(Express.urlencoded(config.express.urlencoded));

        // parse application/json
        app.use(Express.json(config.express.json));
    }
}
