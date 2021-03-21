import { ICoreModule } from "./modules/core-module-interface";
import { ServerInitClass } from "@APP/server-init";

/**
 * Server class
 */
export class Server {
    private logger: Console = console;

    /**
     * Ctr
     */
    constructor(logger: Console) {
        this.logger = logger;
    }

    /**
     * Start server
     */
    public async start(): Promise<void> {
        await this.initModule("dotenv");
        await this.initModule("database");
        await this.initModule("express");

        /* Run server-init class */
        await new ServerInitClass().onServerInitialized(this);
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
