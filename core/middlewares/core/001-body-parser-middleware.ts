import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";

import Express from "express";

/**
 * Defualt export
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

        /* TODO: READ LIMIT VALUE FROM CONFIG FILE */

        // parse application/x-www-form-urlencoded
        app.use(
            Express.urlencoded({
                extended: false,
                limit: "5M",
            })
        );

        // parse application/json
        app.use(Express.json());
    }
}
