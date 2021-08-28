import { GlobalData } from "@CORE/helpers/global-data-helper";
import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";

/**
 * ServerInit listener
 */
export default class ServerInitListener implements IEventListener {
    /**
     * Get name
     */
    name(): string {
        return "server-init";
    }

    /**
     * Apply events
     * @param payload {UserCheckListStatusType}
     * @returns {any}
     */
    async handle(payload?: any): Promise<any> {
        console.log("Server initailized successfully");
    }
}
