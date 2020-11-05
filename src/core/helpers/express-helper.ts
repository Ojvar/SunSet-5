import * as Http from "http";
import * as Https from "https";
import * as Express from "express";
import { readFileSync } from "fs";
import { blue, green, red, yellow } from "chalk";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import { ExpressConfigType } from "@Lib/types/config/express-config-type";

export default class ExpressHelper {
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

    /* Setup middlewares */
    await this.setupMiddlewares();

    /* Setup routes */
    await this.applyRoutes();

    /* Create server */
    await this.listen();
  }

  /**
   * Setup middlewares
   */
  private async setupMiddlewares(): Promise<void> {
    /*  */
  }

  /**
   * Apply routes
   */
  private async applyRoutes(): Promise<void> {
    /*  */
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
}
