import { GlobalData } from "@CORE/helpers/global-data-helper";
import { NextFunction, Request, Response } from "express";

/**
 * Auth controller
 */
export class AuthController {
    /**
     * Login function
     * @param req { Request }
     * @param res { Response }
     * @param next { NextFunction }
     */
    public login(req: Request, res: Response, next: NextFunction) {
        res.render("pages/auth/login.pug", { user: req.user });
    }

    /**
     * Logout function
     * @param req { Request }
     * @param res { Response }
     * @param next { NextFunction }
     */
    public logout(req: Request, res: Response, next: NextFunction) {
        res.redirect(
            GlobalData.Express.app.RouteManager.routePath("auth.login")
        );
    }

    /**
     * AttempToLogin function
     * @param req { Request }
     * @param res { Response }
     * @param next { NextFunction }
     */
    public attempToLogin(req: Request, res: Response, next: NextFunction) {
        res.send({
            data: GlobalData.express?.app.RouteManager.routePath("home.index"),
            success: true,
        });
    }
}
