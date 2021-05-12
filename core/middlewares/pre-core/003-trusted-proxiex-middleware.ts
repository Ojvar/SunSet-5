import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import Express from "express";

/**
 * Default export
 */
export default class ViewEngineMiddleware implements MiddlewareInterface {
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

        if (app.get("env") === "production") {
            /* Trust first proxy */
            app.set("trust proxy", 1);
        }
    }
}
