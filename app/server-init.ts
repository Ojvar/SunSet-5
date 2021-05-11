import { GlobalData } from "@CORE/helpers/global-data-helper";

/**
 * Server init class
 */
export class ServerInitClass {
    /**
     * On server initialized method
     * @param payload {any} Payload data
     */
    public async onServerInitialized(payload?: any) {
        /* Write whatever you want to do immediatly after server initilized successfully */
        GlobalData.logger.info("Server initalized successfully");
    }
}
