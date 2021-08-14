import { GlobalData } from "@CORE/helpers/global-data-helper";
import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";

/**
 * ServerInit listener
 */
export default class ServerInitListener implements IEventListener {
    /**
     * Get listener name
     */
    public name(): string {
        return "on-server-init";
    }

    /**
     * Handle event
     * @param payload {any} Payload data
     */
    public async handle(payload?: any): Promise<any> {
        GlobalData.logger.info("Server initalized successfully");

        return payload;
    }
}
