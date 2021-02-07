import Express from "express";
import ServerConfig from "@CONFIGS/core/server";
import { GlobalMethods } from "./global-methods-helper";
import { RouteManager } from "./route-manager";

/**
 * Express helper
 */
export class ExpressHelper {
    private logger: Console = console;
    private app?: Express.Application;
    private config: ExpressConfigType = ServerConfig;
    private routeManager?: RouteManager;

    /**
     * Get app instance
     */
    public get App(): Express.Application {
        return this.app as Express.Application;
    }

    /**
     * Get route-mamanger
     */
    public get RouteManager(): RouteManager {
        return this.routeManager as RouteManager;
    }

    /**
     * Get InternalUrl
     */
    public get internalUrl(): string {
        return `${this.config.proto}://${this.config.host}:${this.config.port}`;
    }

    /**
     * Get ExternalUrl
     */
    public get externalUrl(): string {
        return `${this.config.serverUrl}`;
    }

    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        this.logger = logger;
        this.routeManager = new RouteManager(logger);
    }

    /**
     * Init helper
     */
    public async init(payload?: any): Promise<void> {
        this.app = Express();
        await this.setupStaticFolders();
        await this.setupViewEngine();
        await this.setupRoutes();
    }

    /**
     * Setup static folder
     */
    public async setupStaticFolders() {
        this.app?.use(Express.static(GlobalMethods.rPath("dist/public")));
    }

    /**
     * Setup view engine
     */
    public async setupViewEngine() {
        this.app?.set("view engine", "pug");
        this.app?.set("views", GlobalMethods.rPath("views"));
    }

    /**
     * Setup routes
     */
    public async setupRoutes() {
        await this.routeManager?.loadRoutes();
        await this.routeManager?.applyRoutes(this.app as Express.Application);
    }

    /**
     * Listen
     */
    public async listen(): Promise<void> {
        this.app?.listen(this.config.port, this.config.host, () => {
            this.logger.info(`
Server started successfully
    INTERNAL URL   ${this.internalUrl}
    EXTERNAL URL   ${this.externalUrl}
`);
        });
    }
}

/**
 * Express config type
 */
export type ExpressConfigType = {
    proto: string;
    port: number;
    host: string;
    serverUrl: string;
};
