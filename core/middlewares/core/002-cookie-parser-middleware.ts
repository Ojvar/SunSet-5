import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import Express from "express";

/**
 * Default export
 */
export default class CookieParserMiddleware implements MiddlewareInterface {
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

        /* TODO: READ CONFIG FILE */
        const CookieParser = (await import("cookie-parser")).default;

        app.use(CookieParser());
    }
}
