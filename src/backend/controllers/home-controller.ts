import { Request, Response, NextFunction, RequestHandler } from "express";

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
    res.render("home.pug");
  }
}
