import { GlobalData } from "@/core/helpers/global-data-helper";

/**
 * Server init class
 */
export class ServerInitClass {
    /**
     * On server initialized method
     * @param payload {any} Payload data
     */
    public async onServerInitialized(payload?: any) {
        /* Do whatever you need immediatly to do after server initilized successfully */
        GlobalData.logger.info("Server initalized successfully");
    }
}
