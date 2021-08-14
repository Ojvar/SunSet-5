/**
 * Event listener interface
 */
export interface IEventListener {
    name(): string;
    handle(payload?: any): Promise<any>;
}
