import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";

import Express from "express";

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
        const ExpressSession = (await import("express-session")).default;
        app.use(
            ExpressSession({
                secret: "MySecretCode_Comes_here",
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: app.get("env") === "production",
                    maxAge: 1 * 60 * 60 * 1000 /* 1Hour */,
                },
            })
        );
    }
}
