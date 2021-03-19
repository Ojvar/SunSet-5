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
        res.render("pages/home/index.pug");
    }

    /**
     * About function
     * @param req
     * @param res
     * @param next
     */
    public about(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/about.pug");
    }

    /**
     * ReportIssue function
     * @param req
     * @param res
     * @param next
     */
    public reportIssue(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/report-issue.pug");
    }

    /**
     * PrivatePage function
     * @param req
     * @param res
     * @param next
     */
    public privatePage(req: Request, res: Response, next: NextFunction) {
        res.render("pages/home/private-page.pug");
    }
}
