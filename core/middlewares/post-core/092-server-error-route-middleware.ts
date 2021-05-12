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

        /* Err handler */
        app.use(
            async (
                error: Error,
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                if (res.headersSent) {
                    return next(error);
                }

                let errorData = {
                    text: "Server Internal Error!",
                    error: null,
                } as { text: string; error: any };

                if (!GlobalMethods.isProductionMode()) {
                    errorData.error = JSON.stringify(error);
                }

                /* Log error */
                this._expressHelper?.Logger.error(
                    JSON.stringify(errorData),
                    error
                );

                /* Send to client */
                switch (GlobalMethods.getRequestType(req)) {
                    case "html":
                        res.render("errors/500.pug", {
                            data: errorData,
                        });
                        break;

                    case "xhr":
                        res.status(500)
                            .send(errorData)
                            .end();
                        break;

                    default:
                        res.status(500)
                            .send("BAD REQUEST")
                            .end();
                        break;
                }
            }
        );
    }
}
