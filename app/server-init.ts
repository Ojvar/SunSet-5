import { GlobalData } from "@CORE/helpers/global-data-helper";

/**
 * ServerInit listener
 */
export class ServerInitClass {
    /**
     * Handle event
     * @param payload {server} Server instance
     */
    public async onServerInitialized(server: any): Promise<any> {
        GlobalData.Events.emit("server-init");
    }
}
