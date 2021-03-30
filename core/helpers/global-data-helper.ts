import { default as ExpressModule } from "core/modules/express-module";
import { IDatabaseDriver } from "core/modules/database-module";
import { PugHelper } from "./pug-helper";
import { Transform } from "stream";
import { default as Winston } from "winston";

/**
 * Global data
 */
export class GlobalData {
    public static logger: Console | Winston.Logger = console;

    public static db?: IDatabaseDriver;

    public static express?: ExpressModule;
    public static pugHelper?: PugHelper;

    /**
     * Getter of express
     */
    public static get Express(): ExpressModule {
        return this.express as ExpressModule;
    }
}
