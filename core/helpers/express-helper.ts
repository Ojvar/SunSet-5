import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";
import { LoggerType } from "@CORE/helpers/global-data-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { RouteManager } from "@CORE/helpers/route-manager";
import Express from "express";
import { lstatSync, readFileSync } from "fs";
import Http from "http";
import Https from "https";

/**
 * Express helper
 */
export class ExpressHelper {
    private logger: LoggerType = console;
    private app?: Express.Application;
    private server?: Http.Server;
    private config: ServerConfigType = ServerConfig();
    private routeManager?: RouteManager;

    /**
     * Get Server instance
     */
    public get Server(): Http.Server {
        return this.server as Http.Server;
    }

    /**
     * Get logger
     */
    public get Logger(): LoggerType {
        return this.logger;
    }

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

        /* Pre-core middlewares */
        await this.setupCustomMiddlewares("core/middlewares/pre-core");

        /* Core middlewares */
        await this.setupCustomMiddlewares("core/middlewares/core");

        /* Post-core middlewares */
        await this.setupCustomMiddlewares("core/middlewares/post-core");
    }

    /**
     * Listen
     */
    public async listen(): Promise<void> {
        /* Setup a http/https server */
        this.server = await this.createServer();

        /* Listen */
        this.server?.listen(this.config.port, this.config.host, () => {
            this.logger.info(`
Server started successfully
    INTERNAL URL   ${this.internalUrl}
    EXTERNAL URL   ${this.externalUrl}
`);
        });
    }

    /**
     * Create a http/https server
     * @param useHttps boolean Use https
     */
    private async createServer(): Promise<Http.Server> {
        if ("https" == this.config.proto) {
            const serverPKeyPath: string = GlobalMethods.rPath(
                this.config.basePath,
                this.config.ssl.serverKey,
            );

            const serverCertPath: string = GlobalMethods.rPath(
                this.config.basePath,
                this.config.ssl.serverCert,
            );

            /* Setup server */
            let options: Http.ServerOptions = {
                key: readFileSync(serverPKeyPath).toString(),
                cert: readFileSync(serverCertPath).toString(),
            } as Http.ServerOptions;

            return Https.createServer(options, this.app);
        } else {
            return Http.createServer(this.app);
        }
    }

    /**
     * SetupvCustomvMiddlewares
     * @param basePath {string} GroupName
     */
    public async setupCustomMiddlewares(basePath: string): Promise<void> {
        const files: Array<string> = GlobalMethods.files(
            basePath,
            "**/*",
            true,
            true,
        );

        for (let i = 0; i < files.length; ++i) {
            const file: string = files[i];

            const Middleware = (await GlobalMethods.importFile(file)).default;
            const middleware: MiddlewareInterface = new Middleware(
                this,
            ) as MiddlewareInterface;

            /* Setup middleware */
            await middleware.setup(this);

            /* Add to middlewares */
            await middleware.check();

            /* Log */
            this.logger.info(`Middleware ${file} loaded successfully`);
        }
    }
}

/**
 * Middleware interface
 */
export interface MiddlewareInterface {
    setup(payload?: any): Promise<void>;
    check(payload?: any): Promise<void>;
}

/**
 * Extends express request
 */
declare global {
    namespace Express {
        interface Request {
            payload: any;
        }
    }
}
