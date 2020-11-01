import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { BaseRouter } from "@Core/Helpers/base-router-helper";

/**
 * Home router
 */
export default class HomeRouter extends BaseRouter {
  /**
   * Constructor
   */
  constructor() {
    super("/");
    this.defineRoutes();
  }

  /**
   * Define routes
   */
  private defineRoutes(): void {
    super.get("/", [this.homeTestRoute], "home.index");
  }

  /* Test middleware */
  private async homeTestRoute(
    req: ExpressRequest,
    res: ExpressResponse,
    Next: NextFunction
  ): Promise<any> {
    res
      .status(200)
      .send({
        success: "OK",
      })
      .end();
  }
}
