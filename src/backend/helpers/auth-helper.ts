import { Request } from "express";
import SessionDataModel from "@BE/data-model/session-data-model";

/**
 * Authentication Helper class
 */
export default class AutHelper {
  /**
   * Clear session data
   * @param req Express.Request request object
   */
  public async logout(req: Request): Promise<void> {
    req.session = undefined;
  }

  /**
   * Register session data
   * @param req Express.Request request object
   * @param payload any session data
   */
  public async register(req: Request, payload: any): Promise<void> {
    req.session = payload;
  }

  /**
   * Check for authenticated user
   * @param req Express.Request request object
   */
  public async check(req: Request): Promise<boolean> {
    const sessionData:
      | SessionDataModel
      | undefined = req.session as SessionDataModel;

    return undefined != sessionData;
  }

  /**
   * Attempt to login
   * @param req Express.Request request object
   * @param payload SessionDataModel session data
   */
  public async attempt(
    req: Request,
    payload: SessionDataModel
  ): Promise<boolean> {
    /* TODO: CHECK DAETABASE */

    await this.register(req, payload);

    return true;
  }
}
