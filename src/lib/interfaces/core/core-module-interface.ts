/**
 * Core Module Interface
 */
export interface ICoreModule {
    /**
     * Get module name
     * @returns string Module name
     */
    getModuleName(): string;

    /**
     * Boot method
     *   Runs at loading object
     * @param payload object Payload object
     * @return Promise<void> Returns Void promise
     */
    boot(payload?: any): Promise<void>;
}
