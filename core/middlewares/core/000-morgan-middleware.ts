import Express, { Request, Response } from "express";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";

import { GlobalMethods } from "@/core/helpers/global-methods-helper";

/**
 * Defualt export
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
        const app: Express.Application = this._expressHelper
            ?.App as Express.Application;

        const Morgan = (await import("morgan")).default;

        /* Load config file */
        const { config } = await GlobalMethods.importFile(
            "./configs/core/morgan"
        );

        app.use(Morgan(config.formatFuction, config));
    }
}
