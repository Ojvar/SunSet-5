import { NextFunction, Request, Response } from "express";

import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { GlobalData } from "@/core/helpers/global-data-helper";

/**
 * Auth controller
 */
export class AuthController {
    /**
     * Login function
     * @param req
     * @param res
     * @param next
     */
    public login(req: Request, res: Response, next: NextFunction) {
        res.render("pages/auth/login.pug");
    }

    /**
     * AttempToLogin function
     * @param req
     * @param res
     * @param next
     */
    public attempToLogin(req: Request, res: Response, next: NextFunction) {
        const data: AttempToLoginValidator = req.payload;

        res.send({
            success: true,
            data: GlobalData.express?.app.RouteManager.routePath("home.index"),
        });
    }
}

/**
 * Attemp-to-login Type
 */
export type AttempToLoginType = {
    email: string;
    pwd: string;
};
