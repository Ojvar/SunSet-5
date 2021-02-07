import { ExpressHelper } from "core/helpers/express-helper";
import { CoreModule } from "./core-module-interface";

/**
 * Express module
 */
export default class ExpressModule extends CoreModule {
    private expressHelper?: ExpressHelper;

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
        this.logger.log("Register Module: Express");

        return this;
    }

    /**
     * Boot method
     * @param payload any
     */
    public async boot(payload?: any): Promise<any> {
        this.expressHelper = new ExpressHelper(this.logger);

        await this.expressHelper.init();
        await this.expressHelper.listen();

        this.logger.log("Boot Module: Express");
        return this;
    }
}
