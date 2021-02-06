import { Request } from "express";
import SessionDataModel from "@BE/data-model/session-data-model";
import ISessionDataModel from "@BE/data-model/session-data-model";

/**
 * Authentication Helper class
 */
export default class AuthHelper {
    /**
     * Clear session data
     * @param req Express.Request request object
     */
    public static logout(req: Request): Promise<void> {
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                resolve();
            });
        });
    }

    /**
     * Register session data
     * @param req Express.Request request object
     * @param payload any session data
     */
    public static async register(
        req: Request,
        payload: ISessionDataModel
    ): Promise<void> {
        const sessionData: ISessionDataModel = req.session as ISessionDataModel;
        sessionData.nationalId = payload.nationalId;
        sessionData.jwt = payload.jwt;
        sessionData.loginAt = payload.loginAt;
    }

    /**
     * Check for authenticated user
     * @param req Express.Request request object
     */
    public static async check(req: Request): Promise<boolean> {
        const sessionData: SessionDataModel = req.session as SessionDataModel;

        return undefined != sessionData.loginAt;
    }

    /**
     * Attempt to login
     * @param req Express.Request request object
     * @param payload SessionDataModel session data
     */
    public static async attempt(
        req: Request,
        payload: SessionDataModel
    ): Promise<boolean> {
        /* TODO: CHECK DAETABASE */
        await this.register(req, payload);

        return true;
    }
}
