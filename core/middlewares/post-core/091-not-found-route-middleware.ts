import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import Express, { NextFunction, Request, Response } from "express";

/**
 * Default export
 */
export default class RouterMiddleware implements MiddlewareInterface {
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

        /* Route handler */
        app.use((req: Request, res: Response, next: NextFunction): void => {
            switch (GlobalMethods.getRequestType(req)) {
                case "html":
                    res.render("errors/404.pug");
                    break;

                case "xhr":
                    res.status(404)
                        .send({
                            success: false,
                            data: "Route not found",
                        })
                        .end();
                    break;

                default:
                    res.status(404)
                        .send("Bad Request")
                        .end();
                    break;
            }
        });
    }
}
