import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";
import { Hash } from "@TYPES/hash-type";
import { parse } from "path";
import { LoggerType } from "./global-data-helper";
import { GlobalMethods } from "./global-methods-helper";

/**
 * ListenerItemType
 */
type ListenerItemType = {
    path: string | null;
    listener: IEventListener | undefined;
};

/**
 * Events helper
 */
export class EventsHelper {
    private logger: LoggerType = console;
    private listeners: Hash<ListenerItemType> = {};

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
        const files = GlobalMethods.files("app/listeners", "**/*", true, true);

        files.forEach((file) => {
            const key: string = parse(file).name.replace("-listener", "");

            this.listeners[key] = {
                path: file,
                listener: undefined,
            };
        });
    }

    /**
     * Add event listener
     * @param listener {IEventListener}
     */
    public addEventListener(listener: IEventListener) {
        const name = listener.name();

        this.listeners[name] = {
            listener: listener,
            path: null,
        };

        this.logger.info(`Listener [${name}] loaded successfully`);
    }

    /**
     * Emit an event
     * @param event {string} Event name
     * @param payload {any} Payload data
     */
    public async emit(event: string, payload?: any): Promise<any> {
        let listener: ListenerItemType | undefined = this.listeners[event];

        /* Check if listener class has been loaded or not */
        if (listener && undefined == listener.listener && listener.path) {
            const ListenerClass: any = (await import(listener.path)).default;

            listener.listener = new ListenerClass();
        }

        return await listener?.listener?.handle(payload);
    }
}
