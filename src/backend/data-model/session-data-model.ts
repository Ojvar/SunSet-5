import { SessionData } from "express-session";

/**
 * Session Data Model interface
 */
export default interface ISessionDataModel extends SessionData {
  name?: string;
  pwd?: string;
  loginAt?: Date;

  viewCount?: number;
}
