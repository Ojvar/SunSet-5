import SessionDataModel from "@BE/data-model/session-data-model";
import { Request, Response, NextFunction } from "express";

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
    let sessionData: SessionDataModel = req.session as SessionDataModel;
    sessionData.viewCount = (sessionData.viewCount ?? 0) + 1;

    res.render("home.pug", { sessionData });
  }
}
