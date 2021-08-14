import { GlobalData, LoggerType } from "@CORE/helpers/global-data-helper";
import { ICoreModule } from "@CORE/modules/core-module-interface";

/**
 * Server class
 */
export class Server {
    private logger: LoggerType = console;

    /**
     * Ctr
     */
    constructor(logger: LoggerType) {
        this.logger = logger;
    }

    /**
     * Start server
     */
    public async start(): Promise<void> {
        await this.initModule("dotenv");
        await this.initModule("logger");
        await this.initModule("events");
        await this.initModule("database");
        await this.initModule("express");

        /* Run server-init class */
        await GlobalData.Events.emit("on-server-init", this);
    }

    /**
     * Init module
     */
    private async initModule(moduleName: string): Promise<any> {
        let ImportedModule: any = (
            await import(`./modules/${moduleName}-module`)
        ).default;
        let module: ICoreModule = new ImportedModule(this.logger);

        /* Register */
        await module.register();

        /* Boot */
        await module.boot();

        return module;
    }
}

new Server(console).start();
