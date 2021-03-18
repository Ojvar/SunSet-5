import Express, { Request, Response, NextFunction } from "express";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";
import { GlobalMethods } from "core/helpers/global-methods-helper";

/**
 * Defualt export
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

        await this._expressHelper?.RouteManager.loadRoutes();
        await this._expressHelper?.RouteManager.applyRoutes(app);

        /* Route handler */
        app.use(
            (
                req: Express.Request,
                res: Express.Response,
                next: Express.NextFunction
            ): void => {
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
            }
        );

        /* Err handler */
        app.use(
            async (
                error: Error,
                req: Express.Request,
                res: Express.Response,
                next: Express.NextFunction
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
