import { ICoreModule } from "./modules/core-module-interface";

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
        await this.initModule("express");
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
