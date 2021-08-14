import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";
import { Hash } from "@TYPES/hash-type";
import { LoggerType } from "./global-data-helper";
import { GlobalMethods } from "./global-methods-helper";

/**
 * Events helper
 */
export class EventsHelper {
    private logger: LoggerType = console;
    private listeners: Hash<IEventListener> = {};

    /**
     * Constructor
     * @param logger {LoggerType}
     */
    constructor(logger: LoggerType = console) {
        this.logger = logger;
    }

    /**
     * Initialize the event handler
     */
    public async init() {
        const files: string[] = GlobalMethods.files(
            "app/listeners",
            "**/*",
            true,
            true,
        );

        for (let i = 0; i < files.length; i++) {
            const file: string = files[i];

            const Listener: any = (await import(file)).default;
            const listener: IEventListener = new Listener();

            this.addEventListener(listener);
        }
    }

    /**
     * Add event listener
     * @param listener {IEventListener}
     */
    public addEventListener(listener: IEventListener) {
        const name = listener.name();

        this.listeners[name] = listener;

        this.logger.info(`Listener [${name}] loaded successfully`);
    }

    /**
     * Emit an event
     * @param event {string} Event name
     * @param payload {any} Payload data
     */
    public async emit(event: string, payload?: any): Promise<any> {
        return await this.listeners[event]?.handle(payload);
    }
}
