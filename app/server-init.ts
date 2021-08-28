import { GlobalData } from "@CORE/helpers/global-data-helper";

/**
 * ServerInit class
 */
export default class ServerInitClass {
    /**
     * onServerInitialized
     * @param payload {any} Payload data
     */
    public async onServerInitialized(payload?: any) {
        GlobalData.Events.emit("server-init");
    }
}
