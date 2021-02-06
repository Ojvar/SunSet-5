export default interface IEventHandler {
    /**
     * Get event name
     */
    getEventName(): string;

    /**
     * Register handle method
     * @param payload any Payload data
     */
    register(payload: any): Promise<void>;

    /**
     * Handle method
     * @param payload any Payload data
     */
    handle(payload: any): Promise<void>;
}
