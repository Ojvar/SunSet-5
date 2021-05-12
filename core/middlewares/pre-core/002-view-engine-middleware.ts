import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { PugHelper } from "@CORE/helpers/pug-helper";
import Express, { NextFunction, Request, Response } from "express";

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

        GlobalData.pugHelper = new PugHelper();

        app.set("view engine", "pug");
        app.set("views", GlobalMethods.rPath("views"));

        /* Setup pug functions */
        app.use(
            async (
                req: Request,
                res: Response,
                next: NextFunction
            ): Promise<void> => {
                await GlobalData.pugHelper?.loadAssetsList();
                res.locals.Helper = GlobalData.pugHelper;

                next();
            }
        );
    }
}
