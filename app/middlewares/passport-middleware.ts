import { config as PassportConfig } from "@CONFIGS/core/passport";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { authenticate } from "passport";

/**
 * Passport middleware
 */
export class PassportMiddleware {
    /**
     * Redirect to HomePage middleware
     */
    public static redirectToHomePage(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            res.redirect(
                GlobalData.express?.app.RouteManager.routePath("home.index") ||
                    "",
            );
        };
    }

    /**
     * Logout middleware
     */
    public static logout(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            req.logout();
            next();
        };
    }

    /**
     * IsLogged in
     */
    public static isLoggedIn(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (undefined == req.user) {
                res.redirect(
                    GlobalData.express?.app.RouteManager.routePath(
                        "auth.login",
                    ) || "",
                );
            } else {
                next();
            }
        };
    }

    /**
     * Local auth middleware
     */
    public static localAuth(): any {
        return authenticate("local");
    }

    /**
     * Google OAuth login middleware
     */
    public static googleOAuthLogin(): any {
        const config = PassportConfig();

        return authenticate("google", {
            scope: config.google?.scope,
        });
    }

    /**
     * Google OAuth auth middleware
     */
    public static googleOAuth(): any {
        const failureRedirect:
            | string
            | undefined = GlobalData.Express.app.RouteManager.routePath(
            "auth.login",
        );

        return authenticate("google", {
            failureRedirect,
        });
    }
}
