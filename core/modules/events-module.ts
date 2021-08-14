import { EventsHelper } from "@CORE/helpers/events-helper";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { CoreModule } from "@CORE/modules/core-module-interface";

/**
 * Logger module
 */
export default class LoggerModule extends CoreModule {
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
        this.logger.log("Register Module: Events");

        return this;
    }

    /**
     * Boot method
     * @param payload any
     */
    public async boot(payload?: any): Promise<any> {
        const eventsHelper = new EventsHelper(this.logger);

        /* Initialize */
        await eventsHelper.init();

        /* Store in Global-data */
        GlobalData.events = eventsHelper;

        this.logger.log("Boot Module: Events");
        return this;
    }
}
