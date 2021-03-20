import { NextFunction, Request, Response } from "express";

import { GlobalData } from "@/core/helpers/global-data-helper";
import { authenticate } from "passport";
import { config } from "@CONFIGS/core/passport";

/**
 * redirectToHomePage middleware
 */
export const redirectToHomePage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.redirect(
        GlobalData.express?.app.RouteManager.routePath("home.index") || ""
    );
};

/**
 * Logout middleware
 */
export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    next();
};

/**
 * IsLogged in
 */
export const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
    if (undefined == req.user) {
        return res.redirect(
            GlobalData.express?.app.RouteManager.routePath("auth.login") || ""
        );
    }

    next();
};

/**
 * Local auth middleware
 */
export const localAuth = () =>
    authenticate("local", {
        failureRedirect: GlobalData.express?.app.RouteManager.routePath(
            "auth.login"
        ),
    });

/**
 * Google OAuth login middleware
 */
export const googleOAuthLogin = () =>
    authenticate("google", {
        scope: config.google?.scope,
    });

/**
 * Google OAuth auth middleware
 */
export const googleOAuth = () =>
    authenticate("google", {
        failureRedirect: GlobalData.express?.app.RouteManager.routePath(
            "auth.login"
        ),
    });
