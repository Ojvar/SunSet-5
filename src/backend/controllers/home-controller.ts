import ISessionDataModel from "@BE/data-model/session-data-model";
import AuthHelper from "@BE/helpers/auth-helper";
import GlobalData from "@Core/Global/global-data";
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
    const isChecked = await AuthHelper.check(req);

    if (isChecked) {
      let sessionData: ISessionDataModel = req.session as ISessionDataModel;
      sessionData.viewCount = (sessionData.viewCount ?? 0) + 1;

      res.render("home.pug", { message: "Your are logged in", loggedIn: true });
    } else {
      res.render("home.pug", {
        message: "Your are not logged in",
        loggedIn: false,
      });
    }
  }

  /**
   * Home/Login action
   * @param req Express.Request Request
   * @param res Express.Response Response
   * @param next Express.NextFunction next function
   */
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const sessionData: ISessionDataModel = {
      loginAt: new Date(),
      name: "Ojvar",
    } as ISessionDataModel;
    await AuthHelper.register(req, sessionData);

    const path = await GlobalData.router.routerManager.route("home.index");
    return res.redirect(path);
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

    const path = await GlobalData.router.routerManager.route("home.index");
    return res.redirect(path);
  }
}
