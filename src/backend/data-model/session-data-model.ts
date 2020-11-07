/**
 * Session Data Model interface
 */
export default interface ISessionDataModel extends Express.Session {
  name?: string;
  pwd?: string;
  loginAt?: Date;

  viewCount?: number;
}
