import { default as ExpressModule } from "core/modules/express-module";
import { IDatabaseDriver } from "core/modules/database-module";
import { PugHelper } from "./pug-helper";

/**
 * Global data
 */
export class GlobalData {
    public static logger: Console = console;

    public static db?: IDatabaseDriver;

    public static express?: ExpressModule;
    public static pugHelper?: PugHelper;
}
