import LoggerModule from "@Core/Modules/logger-module";
import RouterModule from "@Core/Modules/router-module";
import EventsModule from "../modules/events-module";

/**
 * Global data
 */
export default class GlobalData {
  public static logger: LoggerModule;
  public static events: EventsModule;
  public static router: RouterModule;
}
