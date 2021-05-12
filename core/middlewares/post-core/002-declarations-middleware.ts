import { MiddlewareInterface } from "@CORE/helpers/express-helper";

/**
 * Default export
 */
export default class DeclarationMiddleware implements MiddlewareInterface {
    async setup(payload?: any): Promise<void> {}

    async check(payload?: any): Promise<void> {}
}

/**
 * Session interface
 */
declare module "express-session" {
    /* Define your session structure here */
    interface SessionData {
        views: number;
    }
}
