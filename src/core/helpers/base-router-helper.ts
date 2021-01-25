import {
  Application,
  Router,
  RouterOptions,
  IRouter,
  RequestHandler,
} from "express";
import IHash from "@Lib/interfaces/hash-interface";
import { IBaseRouter } from "@Lib/interfaces/core/base-router-interface";
import { RouteItemType } from "@Lib/types/core/route-data-type";

/**
 * Base Router
 */
export default class BaseRouter implements IBaseRouter {
  private _baseUrl: string = "";
  private _name: string = "";
  private _router?: IRouter;
  private _routes: IHash<IRouter> = {};

  /**
   * Getter: Router
   */
  public get router(): IRouter {
    if (!this._router) {
      throw new Error("Router is null");
    }

    return this._router;
  }

  /**
   * Constructor
   * @param baseUrl string BaseUrl
   * @param routerOptions RouterOptions Router options
   */
  constructor(
    baseUrl: string,
    name: string = baseUrl,
    routerOptions?: RouterOptions
  ) {
    this._baseUrl = baseUrl;
    this._name = name;
    this._router = Router(routerOptions);
  }

  /**
   * Get router base-url
   */
  public getBaseUrl(): string {
    return this._baseUrl;
  }

  /**
   * Get router name
   */
  public getName(): string {
    return this._name;
  }

  /**
   * Get router
   */
  public getRouter(): IRouter {
    return this.router;
  }

  /**
   * Get routers list
   * @returns IHash<IRouter> get all routes
   */
  public getRoutes(): IHash<IRouter> {
    return this._routes;
  }

  /**
   * Apply router on an express-application instance
   * @param app Application Express application instance
   */
  public apply(app: Application): void {
    if (null == app) {
      throw new Error("App is undefined");
    } else if (null == this._router) {
      throw new Error("Router is undefined");
    }

    app.use(this._baseUrl, this.router);
  }

  /**
   * Get routes list
   */
  public getRoutesList(): IHash<RouteItemType> {
    const result: IHash<RouteItemType> = {};
    const keys = Object.keys(this._routes);

    keys.forEach((key) => {
      const route: any = this._routes[key];

      result[key] = {
        baseUrl: this._baseUrl,
        alias: key,
        path: route.route.path,
        keys: route.keys,
        method: route.route.stack.map((x: any) => x.method),
      } as RouteItemType;
    });

    return result;
  }

  /**
   * Get last route
   * @returns any Get last route
   */
  public getLastRoute(): any {
    return this._router?.stack[this._router?.stack.length - 1];
  }

  /**
   * Add a new "ALL" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public all(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.all(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "OPTIONS" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public options(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.options(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "HEAD" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public head(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.head(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "GET" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public get(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.get(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "POST" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public post(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.post(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "PATCH" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public patch(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.patch(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "PUT" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public put(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.put(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }

  /**
   * Add a new "DELETE" route
   * @param pattern string Pattern string
   * @param middlewares RequestHandler[] Request handlers
   * @param alias string Alias of route
   */
  public del(
    pattern: string,
    middlewares: RequestHandler[],
    alias?: string
  ): void {
    this.router.delete(pattern, middlewares);

    if (alias) {
      let newRoute: any = this.getLastRoute();
      this._routes[alias] = newRoute;
    }
  }
}
