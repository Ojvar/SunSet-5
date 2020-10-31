/**
 * Core Module Interface
 */
export interface ICoreModule {
  /**
   * Boot method
   *   Runs at loading object
   * @param payload object Payload object
   * @return Promise<void> Returns Void promise
   */
  boot(payload?: any): Promise<void>;

  /**
   * Get module name
   * @returns string Module name
   */
  getModuleName(): string;
}
