import { SessionData } from "express-session";

/**
 * Session Data Model interface
 */
export default interface ISessionDataModel extends SessionData {
    nationalId?: string;
    jwt?: string;
    loginAt?: Date;
}
