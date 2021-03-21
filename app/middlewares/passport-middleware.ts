import { NextFunction, Request, Response } from "express";

import { GlobalData } from "@/core/helpers/global-data-helper";
import { authenticate } from "passport";
import { config } from "@CONFIGS/core/passport";

/**
 * Passport middleware
 */
export class PassportMiddleware {
    /**
     * Redirect to HomePage middleware
     */
    public static redirectToHomePage(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        res.redirect(
            GlobalData.express?.app.RouteManager.routePath("home.index") || ""
        );
    }

    /**
     * Logout middleware
     */
    public static logout(req: Request, res: Response, next: NextFunction) {
        req.logout();
        next();
    }

    /**
     * IsLogged in
     */
    public static isLoggedin() {
        return (req: Request, res: Response, next: NextFunction) => {
            if (undefined == req.user) {
                res.redirect(
                    GlobalData.express?.app.RouteManager.routePath(
                        "auth.login"
                    ) || ""
                );
            } else {
                next();
            }
        };
    }

    /**
     * Local auth middleware
     */
    public static localAuth() {
        return authenticate("local");
    }

    /**
     * Google OAuth login middleware
     */
    public static googleOAuthLogin() {
        return authenticate("google", {
            scope: config.google?.scope,
        });
    }

    /**
     * Google OAuth auth middleware
     */
    public static googleOAuth() {
        return authenticate("google", {
            failureRedirect: GlobalData.express?.app.RouteManager.routePath(
                "auth.login"
            ),
        });
    }
}
