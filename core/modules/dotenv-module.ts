import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { CoreModule } from "@CORE/modules/core-module-interface";
import DotEnv from "dotenv";

/**
 * DotEnv module
 */
export default class DotEnvModule extends CoreModule {
    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        super(logger);
    }

    /**
     * Register method
     * @param payload any
     */
    public async register(payload?: any): Promise<any> {
        this.logger.log("Register Module: DotEnv");

        return this;
    }

    /**
     * Boot method
     * @param payload any
     */
    public async boot(payload?: any): Promise<any> {
        payload = payload || process.env.ENV_FILE || ".env";
        const config: DotEnv.DotenvConfigOptions = {
            path: GlobalMethods.rPath(payload),
            encoding: "utf-8",
            debug: process.env.NODE_ENV != "production",
        } as DotEnv.DotenvConfigOptions;
        DotEnv.config(config);

        this.logger.log("Boot Module: DotEnv");
        return this;
    }
}
