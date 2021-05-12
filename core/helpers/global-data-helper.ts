import { PugHelper } from "@CORE/helpers/pug-helper";
import { IDatabaseDriver } from "@CORE/modules/database-module";
import { default as ExpressModule } from "@CORE/modules/express-module";
import { Multer } from "multer";
import { default as Winston } from "winston";

/**
 * Global data
 */
export class GlobalData {
    public static logger: LoggerType = console;

    public static db?: IDatabaseDriver;

    public static upload?: Multer;
    public static express?: ExpressModule;
    public static pugHelper?: PugHelper;

    /**
     * Getter of express
     */
    public static get Express(): ExpressModule {
        return this.express as ExpressModule;
    }

    /**
     * Getter of upload
     */
    public static get Upload(): Multer {
        return this.upload as Multer;
    }
}

/**
 * Logger type
 */
export type LoggerType = Console | Winston.Logger;
