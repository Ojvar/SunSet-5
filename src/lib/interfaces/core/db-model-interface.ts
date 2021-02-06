/**
 * DB Model interface
 */
export default interface IDBModel {
    /**
     * Get model name
     * @returns string Model name
     */
    getName(): string;

    /**
     * Get database model name
     * @returns string Database model name
     */
    getDbName(): string | undefined;

    /**
     * Setup method
     * @param dbEngine any Db Engine
     */
    setup(dbEngine: any): Promise<any>;
}
