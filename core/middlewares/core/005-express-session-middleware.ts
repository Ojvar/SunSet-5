import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";

import Express from "express";
import ExpressSession from "express-session";

/**
 * Defualt export
 */
export default class CookieSession implements MiddlewareInterface {
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
        const ExpressSession = await (await import("express-session")).default;
        const expressSession = ExpressSession({
            secret: "@SunS37V5@@SECRETkey__##",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: app.get("env") === "production" },
        });

        app.use(expressSession);
    }
}
