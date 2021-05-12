import { config as MorganConfig } from "@CONFIGS/core/morgan";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import Express from "express";

/**
 * Default export
 */
export default class StaticsMiddleware implements MiddlewareInterface {
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
        const config: any = MorganConfig();
        const app: Express.Application = this._expressHelper
            ?.App as Express.Application;

        const Morgan = (await import("morgan")).default;
        app.use(Morgan(config.formatFuction, config));
    }
}
