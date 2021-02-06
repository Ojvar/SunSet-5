import { NextFunction, Request, Response } from "express";
import AuthHelper from "@BE/helpers/auth-helper";
import GlobalData from "@Core/Global/global-data";

/**
 * Home controller
 */
export default class HomeController {
    /**
     * Home/Index action
     * @param req Express.Request Request
     * @param res Express.Response Response
     * @param next Express.NextFunction next function
     */
    public async index(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const isChecked = await AuthHelper.check(req);

        if (isChecked) {
            // res.render("home.pug");
            res.render("test.pug");
        } else {
            res.render("pages/auth/login.pug");
        }
    }

    /**
     * Home/logout action
     * @param req Express.Request Request
     * @param res Express.Response Response
     * @param next Express.NextFunction next function
     */
    public async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        await AuthHelper.logout(req);

        const path = await GlobalData.router.routerManager.route("auth.login");

        return res.redirect(path);
    }
}
