import { NextFunction, Request, Response } from "express";

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
}
