import Express from "express";

/**
 * Extends express request
 */
declare global {
    namespace Express {
        interface Request {
            payload: any;
        }
    }
}
