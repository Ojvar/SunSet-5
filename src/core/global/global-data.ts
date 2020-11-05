import { RateLimit } from "express-rate-limit";
import CSURF from "csurf";
import Multer from "multer";
import ExpressModule from "@Core/Modules/express-module";
import LoggerModule from "@Core/Modules/logger-module";
import RouterModule from "@Core/Modules/router-module";
import IDatabaseDriver from "@Lib/interfaces/core/database-driver-interface";
import EventsModule from "../modules/events-module";

/**
 * Global data
 */
export default class GlobalData {
  public static logger: LoggerModule;
  public static events: EventsModule;
  public static router: RouterModule;
  public static express: ExpressModule;
  public static dbEngine: IDatabaseDriver;

  public static rateLimiter: RateLimit;
  public static csrf: CSURF.CookieOptions;
  public static upload: Multer.Multer;
}
