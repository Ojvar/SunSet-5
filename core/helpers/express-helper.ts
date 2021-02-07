import Express from "express";
import ServerConfig from "@CONFIGS/core/server";
import Http from "http";
import { GlobalMethods } from "./global-methods-helper";
import { RouteManager } from "./route-manager";

/**
 * Express helper
 */
export class ExpressHelper {
    private logger: Console = console;
    private app?: Express.Application;
    private server?: Http.Server;
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

        await this.setupMiddlewares();

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
     * Setup middlewares
     */
    public async setupMiddlewares() {
        this.setupBodyParser();
        this.setupCookieParser();
        this.setupGZip();
    }

    /**
     * Setup routes
     */
    public async setupRoutes() {
        await this.routeManager?.loadRoutes();
        await this.routeManager?.applyRoutes(this.app as Express.Application);

        /* Route handler */
        this.app?.use(
            (
                req: Express.Request,
                res: Express.Response,
                next: Express.NextFunction
            ): void => {
                switch (GlobalMethods.getRequestType(req)) {
                    case "html":
                        res.render("errors/404.pug");
                        break;

                    case "xhr":
                        res.status(404)
                            .send({
                                success: false,
                                data: "Route not found",
                            })
                            .end();
                        break;

                    default:
                        res.status(404)
                            .send("Bad Request")
                            .end();
                        break;
                }
            }
        );

        /* Err handler */
        this.app?.use(
            async (
                error: Error,
                req: Express.Request,
                res: Express.Response,
                next: Express.NextFunction
            ) => {
                if (res.headersSent) {
                    return next(error);
                }

                let errorData = {
                    text: "Server Internal Error!",
                    error: null,
                } as { text: string; error: any };

                if (!GlobalMethods.isProductionMode()) {
                    errorData.error = JSON.stringify(error);
                }

                /* Log error */
                this.logger.error(JSON.stringify(errorData), error);

                /* Send to client */
                switch (GlobalMethods.getRequestType(req)) {
                    case "html":
                        res.render("errors/500.pug", {
                            data: errorData,
                        });
                        break;

                    case "xhr":
                        res.status(500)
                            .send(errorData)
                            .end();
                        break;

                    default:
                        res.status(500)
                            .send("BAD REQUEST")
                            .end();
                        break;
                }
            }
        );
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
     * Setup body-parser
     */
    public async setupBodyParser() {
        const BodyParser = await import("body-parser");

        /* TODO: READ LIMIT VALUE FROM CONFIG FILE */

        // parse application/x-www-form-urlencoded
        this.app?.use(
            BodyParser.urlencoded({
                extended: false,
                limit: "5M",
            })
        );

        // parse application/json
        this.app?.use(BodyParser.json());
    }

    /**
     * Setup cookie-parser
     */
    public async setupCookieParser() {
        const CookieParser = (await import("cookie-parser")).default;

        /* TODO: READ CONFIG FILE */

        this.app?.use(CookieParser());
    }

    /**
     * Setup GZip
     */
    public async setupGZip() {
        const Comporession = (await import("compression")).default;

        this.app?.use(Comporession());
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
