import * as BodyParser from "body-parser";
import * as Helmet from "helmet";
import * as CookieParser from "cookie-parser";
import * as CORS from "cors";
import * as CSURF from "csurf";
import * as Multer from "multer";
import { v4 as uuidV4 } from "uuid";
import * as MimeTypes from "mime-types";
import * as Crypto from "crypto";
import * as RateLimit from "express-rate-limit";
import * as RedisStore from "rate-limit-redis";
import * as Http from "http";
import * as Https from "https";
import * as Express from "express";
import { readFileSync } from "fs";
import { blue, green, red, yellow } from "chalk";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import { ExpressConfigType } from "@Lib/types/config/express-config-type";
import FrontendGlobalHelper from "./frontend-global-helper";
import SessionHelper from "./session-helper";
import { ExpressErrorType } from "@Lib/types/core/error-type";
import { MulterConfigType } from "@Lib/types/config/multer-config-type";

/**
 * Express helper
 */
export default class ExpressHelper {
  public readonly C_STORE_REDIS: string = "redis";

  private _config: ExpressConfigType = {} as ExpressConfigType;
  private _app?: Express.Application = undefined;
  private _server?: Http.Server = undefined;

  /**
   * Getter: _config
   */
  public get config(): ExpressConfigType {
    return this._config;
  }

  /**
   * Getter: _app
   */
  public get app(): Express.Application {
    if (undefined == this._app) {
      throw new Error("App is undefined");
    }

    return this._app;
  }

  /**
   * Getter: _server
   */
  public get server(): Http.Server {
    if (undefined == this._server) {
      throw new Error("Server is undefined");
    }

    return this._server;
  }

  /**
   * Init method
   * @param payload any Payload
   */
  public async init(payload?: any): Promise<void> {
    /* Create app */
    this._app = Express();

    /* Read config */
    this._config = await GlobalMethods.config("core/express");

    /* Setup pugEngine */
    await this.setupPugEngine();

    /* Setup middlewares */
    await this.setupMiddlewares();

    /* Setup routes */
    await this.applyRoutes();

    /* Create server */
    await this.listen();
  }

  /**
   * Setup Pug engine
   * @param app Express.Application App Instance
   */
  private async setupPugEngine(): Promise<void> {
    const app = this.app;
    app.set("view engine", "pug");
    app.set("views", GlobalMethods.rPath("views"));

    const globalFuncs: FrontendGlobalHelper = new FrontendGlobalHelper();

    app.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        globalFuncs.prepare();

        res.locals.Helper = globalFuncs;
        next();
      }
    );
  }

  /**
   * Apply routes
   */
  private async applyRoutes(): Promise<void> {
    GlobalData.router.routerManager.apply(this.app);
  }

  /**
   * Start listening
   */
  public async listen(): Promise<void> {
    const { port, host, url, protocol } = this.config;
    const isHttps: boolean = protocol == "https";
    const localUrl: string = `${protocol}://${host}:${port}`;
    const messageFnc: () => void = (): void => {
      GlobalData.logger.info(`
Server started
        PROTOCOL  ${isHttps ? green(protocol) : yellow(protocol)}
            PORT  ${yellow(port)}
            HOST  ${yellow(host)}
       LOCAL-URL  ${blue(localUrl)}
      SERVER-URL  ${red(url)}`);
    };

    /* Setup a http/https server */
    this._server = this.createServer(isHttps);

    /* Start listening */
    this.server.listen(port, host, messageFnc);
  }

  /**
   * Create a http/https server
   * @param useHttps boolean Use https
   */
  private createServer(useHttps: boolean): Http.Server {
    let server: Http.Server;

    if (useHttps) {
      const serverPKeyPath: string = GlobalMethods.rPath(
        this.config.sslServerKey
      );
      const serverCertPath: string = GlobalMethods.rPath(
        this.config.sslServerCert
      );

      const privateKey: string = readFileSync(serverPKeyPath).toString();
      const certificate: string = readFileSync(serverCertPath).toString();

      /* Setup server */
      let options: Http.ServerOptions = {
        key: privateKey,
        cert: certificate,
      } as Http.ServerOptions;

      server = Https.createServer(options, this.app);
    } else {
      server = Http.createServer(this.app);
    }

    return server;
  }

  /**
   * Setup middlewares
   */
  private async setupMiddlewares(): Promise<void> {
    this.app.use(Express.static("public"));

    await this.setupBodyAndCookieParser();
    await this.setupTrustedProxy();
    await this.setupCORS();
    await this.setupThrottle();
    await this.setupHelmet();
    await this.setupCSRF();
    await this.setupMulter();

    await this.setupSession();

    await this.setupRouteHandler();
    await this.setupRouteErrors();
  }

  /**
   * Setup trusted proxy level
   */
  private async setupTrustedProxy(): Promise<void> {
    if (GlobalMethods.isProductionMode()) {
      this.app.set("trust proxy", this.config.trustedProxy);
    }
  }

  /**
   * Setup CROS
   */
  private async setupCORS(): Promise<void> {
    const corsOptions = {
      origin: true,
      // some legacy browsers (IE11, various SmartTVs) choke on 204
      optionsSuccessStatus: 200,
    };

    const app = this.app;
    app.options("*", CORS(corsOptions));
    app.use(CORS());
  }

  /**
   * Setup throttle
   * @param app Express.Applicaiton Application instance
   */
  private async setupThrottle(): Promise<void> {
    const rateLimitOptions: RateLimit.Options = {
      windowMs: +this.config.throttleWindow,
      max: +this.config.throttleMax,
      delayMs: +this.config.throttleDelay,
    } as RateLimit.Options;

    if (this.config.throttleStore == this.C_STORE_REDIS) {
      rateLimitOptions.store = new RedisStore({});
    }

    GlobalData.rateLimiter = RateLimit(rateLimitOptions);
  }

  /**
   * Setup Body and Cookie parsers
   * @param app Express.Applicaiton Application instance
   */
  private async setupBodyAndCookieParser(): Promise<void> {
    const app = this.app;

    /* Add cookie-parse */
    app.use(CookieParser());

    /* Add body parser */
    app.use(
      BodyParser.urlencoded({
        extended: false,
      } as BodyParser.OptionsUrlencoded)
    );

    app.use(BodyParser.json());
  }

  /**
   * Setup Helmet
   * @param app Express.Applicaiton Application instance
   */
  private async setupHelmet(): Promise<void> {
    const app = this.app;
    const helmetConfig: any = await GlobalMethods.config("core/helmet");

    /* Inline scripts key-generator */
    app.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        res.locals.nonce = Crypto.randomBytes(16).toString("hex");
        next();
      }
    );

    app.use(
      Helmet.contentSecurityPolicy(helmetConfig.contentSecurityPolicy || {})
    );
    app.use(Helmet.dnsPrefetchControl(helmetConfig.dnsPrefetchControl || {}));
    app.use(Helmet.expectCt(helmetConfig.expectCt || {}));
    app.use(Helmet.frameguard(helmetConfig.frameguard || {}));
    app.use(Helmet.hidePoweredBy());
    app.use(Helmet.hsts(helmetConfig.hsts || {}));
    app.use(Helmet.ieNoOpen());
    app.use(Helmet.noSniff());
    app.use(
      Helmet.permittedCrossDomainPolicies(
        helmetConfig.permittedCrossDomainPolicies || {}
      )
    );
    app.use(Helmet.referrerPolicy(helmetConfig.referrerPolicy || {}));
    app.use(Helmet.xssFilter());
  }

  /**
   * Setup CSRF
   * @param app Express.Applicaiton Application instance
   */
  private async setupCSRF(): Promise<void> {
    const app = this.app;
    const csrf = CSURF({
      cookie: true,
    });

    app.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        if (GlobalMethods.useCSRF(req)) {
          next();
        } else {
          csrf(req, res, next);
        }
      }
    );

    app.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        res.locals.csrftoken = req.csrfToken ? req.csrfToken() : "";
        next();
      }
    );
  }

  /**
   * Setup Multer
   * @param app Express.Applicaiton Application instance
   */
  private async setupMulter(): Promise<void> {
    const app = this.app;

    /* Setup multer */
    const multerConfig: MulterConfigType = await GlobalMethods.config<
      MulterConfigType
    >("core/multer");

    /* Create storage diretory */
    await GlobalMethods.createDir(multerConfig.storage);

    /* Setup multer */
    const storage: Multer.StorageEngine = Multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, multerConfig.storage);
      },
      filename: function (req, file, cb) {
        let ext = MimeTypes.extension(file.mimetype);
        ext = ext ? `.${ext}` : "";

        let filename = `${uuidV4()}${ext}`;
        cb(null, filename);
      },
    });

    GlobalData.upload = Multer({
      limits: { fieldSize: multerConfig.maxSize },
      storage,
    });

    /* Use multer as middleware */
    if (this.config.useMulter) {
      app.use(GlobalData.upload.any());
    }
  }

  /**
   * Setup RouteHandler
   * @param app Express.Applicaiton Application instance
   */
  private async setupRouteHandler(): Promise<void> {
    const app = this.app;

    app.use(
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
            res
              .status(404)
              .send({
                success: false,
                data: "Route not found",
              })
              .end();
            break;

          default:
            res.status(404).send("Bad Request").end();
            break;
        }
      }
    );
  }

  /**
   * Setup RouteErrors
   * @param app Express.Applicaiton Application instance
   */
  private async setupRouteErrors(): Promise<void> {
    const app = this.app;

    const errHandler = (
      error: Error,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ): void => {
      if (res.headersSent) {
        return next(error);
      }

      let errorData: ExpressErrorType = {
        text: "Server Internal Error!",
        error: null,
      };

      if (!GlobalMethods.isProductionMode()) {
        errorData.error = JSON.stringify(error);
      }

      /* Log error */
      GlobalData.logger.error(JSON.stringify(errorData));
      console.error(error);

      /* Send to client */
      switch (GlobalMethods.getRequestType(req)) {
        case "html":
          res.render("errors/500.pug", {
            data: errorData,
          });
          break;

        case "xhr":
          res.status(500).send(errorData).end();
          break;

        default:
          res.status(500).send("BAD REQUEST").end();
          break;
      }
    };

    /* Setup Error handler middleware */
    app.use(errHandler);
  }

  /**
   *  Setup Session module
   */
  private async setupSession(): Promise<void> {
    const app = this.app;
    const sessionModule = new SessionHelper();
    await sessionModule.init(app);

    GlobalData.logger.info("Session initialized");
  }
}
