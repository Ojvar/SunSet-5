import { default as ExpressModule } from "core/modules/express-module";
import { IDatabaseDriver } from "core/modules/database-module";
import { Multer } from "multer";
import { PugHelper } from "./pug-helper";

/**
 * Global data
 */
export class GlobalData {
    public static logger: Console = console;

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
