import { GlobalData } from "@CORE/helpers/global-data-helper";
import { config as PassportConfig } from "@CONFIGS/core/passport";
import { NextFunction, Request, Response } from "express";
import { authenticate } from "passport";

/**
 * Passport middleware
 */
export class PassportMiddleware {
    /**
     * Redirect to HomePage middleware
     */
    public static redirectToHomePage() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.redirect(
                GlobalData.express?.app.RouteManager.routePath("home.index") ||
                    ""
            );
        };
    }

    /**
     * Logout middleware
     */
    public static logout() {
        return (req: Request, res: Response, next: NextFunction) => {
            req.logout();
            next();
        };
    }

    /**
     * IsLogged in
     */
    public static isLoggedIn() {
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
        const config = PassportConfig();

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
