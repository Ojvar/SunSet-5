import { NextFunction, Request, Response } from "express";

import { authenticate } from "passport";
import { config } from "@CONFIGS/core/passport";

/* Constants */
const failureRedirect = "/auth/login";

/**
 * redirectToHomePage middleware
 */
export const redirectToHomePage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    /* TODO: USE routes file instead of absolute path */
    res.redirect("/");
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
        res.redirect("/auth/login");
    } else {
        next();
    }
};

/**
 * Local auth middleware
 */
export const localAuth = authenticate("local", { failureRedirect });

/**
 * Google OAuth login middleware
 */
export const googleOAuthLogin = authenticate("google", {
    scope: config.google?.scope,
});

/**
 * Google OAuth auth middleware
 */
export const googleOAuth = authenticate("google", {
    failureRedirect,
});
