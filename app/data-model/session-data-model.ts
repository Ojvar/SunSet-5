import { SessionData } from "express-session";

/**
 * Session Data Model interface
 */
export interface ISessionDataModel extends SessionData {
    email?: string;
    loginAt?: Date;
}
