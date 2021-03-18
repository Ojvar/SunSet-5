import Express from "express";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";

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
        const CookieSession = (await import("cookie-session")).default;

        app.use(
            CookieSession({
                /* 1Hour */
                maxAge: 1 * 60 * 60 * 1000,
                keys: ["key1****!!@##!@#!2222", "key296++9*//89655-SDFxxS"],
            })
        );
    }
}
