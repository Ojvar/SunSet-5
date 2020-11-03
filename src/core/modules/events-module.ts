import { union } from "lodash";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";
import IEventHandler from "@Lib/interfaces/core/event-handler-interface";
import IHash from "@Lib/interfaces/hash-interface";
import GlobalMethods from "../global/global-methods";
import BaseModule from "./base-module";

/**
 * Events module
 */
export default class EventsModule extends BaseModule implements ICoreModule {
  private _handlers: IHash<IEventHandler> = {};

  /**
   * Events factory
   */
  public static createModule(): EventsModule {
    return new EventsModule();
  }

  /**
   * Getter of handlers
   */
  public get handlers(): IHash<IEventHandler> {
    return this._handlers;
  }

  /**
   * Contstrcutor
   */
  constructor() {
    super();
  }

  /**
   * Get module name
   */
  public getModuleName(): string {
    return "Events";
  }

  /**
   * Boot method
   * @param payload any Payload data
   */
  public async boot(payload?: any): Promise<void> {
    const userEventHandlersPath: string = `${__dirname}/../../backend/handlers/**/*`;
    const globalEventHandlersPath: string = `${__dirname}/../handlers/**/*`;

    /* Load handlers */
    const eventHandlers = await GlobalMethods.loadFiles(
      globalEventHandlersPath
    );
    const userEventHandlers = await GlobalMethods.loadFiles(
      userEventHandlersPath
    );

    /* Union core and user handlers */
    let handlers = union(eventHandlers, userEventHandlers);

    /* Try to push to handlers */
    for (let i = 0; i < handlers.length; i++) {
      await this.addHandler(handlers[i]);
    }
  }

  /**
   * Add handler to handlers
   * @param file string File name
   */
  private async addHandler(file: string): Promise<void> {
    /* Load module */
    let EventHandler = await GlobalMethods.loadModule<any>(file);
    const eventHandler: IEventHandler = new EventHandler();
    const eventName: string = eventHandler.getEventName();

    /* Add to handlers */
    this.handlers[eventName] = eventHandler;

    /* Run module boot() method  */
    await eventHandler.register(this.handlers);
  }

  /**
   * Raise an event
   * @param eventName string Event name
   * @param payload object Payload data
   */
  public raise(eventName: string, payload?: object): Promise<void> {
    let handler: IEventHandler = this.handlers[eventName];

    return handler.handle(payload);
  }
}
