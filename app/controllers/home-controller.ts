import { NextFunction, Request, Response } from "express";

/**
 * Home controller
 */
export class HomeController {
    /**
     * Index function
     * @param req
     * @param res
     * @param next
     */
    public index(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/index.pug", { user: req.user });
    }

    /**
     * About function
     * @param req
     * @param res
     * @param next
     */
    public about(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/about.pug", { user: req.user });
    }

    /**
     * ReportIssue function
     * @param req
     * @param res
     * @param next
     */
    public reportIssue(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/report-issue.pug", { user: req.user });
    }

    /**
     * PrivatePage function
     * @param req
     * @param res
     * @param next
     */
    public privatePage(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/private-page.pug", { user: req.user });
    }
}
