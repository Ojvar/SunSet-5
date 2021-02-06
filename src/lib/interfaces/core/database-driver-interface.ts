/**
 * Database driver interface
 */
export default interface IDatabaseDriver {
    /**
     * Get database engine
     */
    getEngine(): any;

    /**
     * Connect to database
     * @param config any Configuration data
     */
    connect(config: any): Promise<void>;

    /**
     * DisConnect from database
     */
    disconnect(): Promise<void>;

    /**
     * Get model object
     * @param name string Model name
     */
    model(name: string): any;
}
