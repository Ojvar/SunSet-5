import { Request, Response } from "express";

/**
 * Cookie Helper class
 */
export class CookieHelper {
    /**
     * Set token cookie
     */
    public static setTokenCookie(res: Response, token: string): void {
        res.cookie("token", token, { maxAge: 60 * 24 * 60 * 1000 });
    }

    /**
     * Get token cookie
     */
    public static getTokenCookie(req: Request): string {
        return (req.cookies["token"] || "") as string;
    }
}
