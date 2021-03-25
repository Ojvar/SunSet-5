import {
    config as ServerConfig,
    ServerConfigType,
    config,
} from "@CONFIGS/core/server";

import Express from "express";
import { GlobalMethods } from "./global-methods-helper";
import Http from "http";
import { RouteManager } from "./route-manager";
import { lstatSync } from "fs";

/**
 * Express helper
 */
export class ExpressHelper {
    private logger: Console = console;
    private app?: Express.Application;
    private server?: Http.Server;
    private config: ServerConfigType = ServerConfig;
    private routeManager?: RouteManager;

    /**
     * Get logger
     */
    public get Logger(): Console {
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
        const useHttps: boolean = this.config.proto == "https";

        let server: Http.Server;

        if (useHttps) {
            /* TODO: IMPLEMENT HTTPS SERVER */

            // const  Https = await import( "https");
            //   const serverPKeyPath: string = GlobalMethods.rPath(
            //     this.config.sslServerKey,
            //   );
            //   const serverCertPath: string = GlobalMethods.rPath(
            //     this.config.sslServerCert,
            //   );

            //   const privateKey: string = readFileSync(serverPKeyPath).toString();
            //   const certificate: string = readFileSync(serverCertPath).toString();

            //   /* Setup server */
            //   let options: Http.ServerOptions = {
            //     key: privateKey,
            //     cert: certificate,
            //   } as Http.ServerOptions;

            //   server = Https.createServer(options, this.app);

            server = Http.createServer(this.app);
        } else {
            server = Http.createServer(this.app);
        }

        return server;
    }

    /**
     * SetupvCustomvMiddlewares
     * @param basePath {string} GroupName
     */
    public async setupCustomMiddlewares(basePath: string): Promise<void> {
        const files: Array<string> = GlobalMethods.files([
            config.basePath,
            basePath,
        ]).filter((file: string) => !lstatSync(file).isDirectory());

        for (let i = 0; i < files.length; ++i) {
            const file: string = files[i];

            const Middleware = (await GlobalMethods.importFile(file)).default;
            const middleware: MiddlewareInterface = new Middleware(
                this
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
