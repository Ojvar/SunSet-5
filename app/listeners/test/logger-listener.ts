import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";

/**
 * Logger listener
 */
export default class LoggerListener implements IEventListener {
    /**
     * Get listener name
     */
    public name(): string {
        return "on-log";
    }

    /**
     * Handle event
     * @param payload {any} Payload data
     */
    public async handle(payload?: any): Promise<any> {
        console.log("Log event handler", payload);

        return payload;
    }
}
