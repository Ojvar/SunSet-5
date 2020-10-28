import RateLimit from "express-rate-limit";
import CSURF from "csurf";
import Multer from "multer";
import LoggerModule from "@Core/modules/logger-module";

/**
 * Global data
 */
export default class GlobalData {
  public static logger: LoggerModule;

  public static rateLimiter: RateLimit.RateLimit;
  public static csrf: CSURF.CookieOptions;
  public static upload: Multer.Multer;
}
