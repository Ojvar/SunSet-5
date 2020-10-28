/**
 * Core Module Interface
 */
export interface ICoreModule {
  /**
   * Boot method
   *   Runs at loading object
   * @param payload object Payload object
   */
  boot(payload?: any): Promise<void>;
}
