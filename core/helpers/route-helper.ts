import Express from "express";
import { Hash } from "@TYPES/hash-type";

/**
 * RouteHelper class
 */
export class RouteHelper {
    private logger: Console = console;
    private router?: Express.Router;
    private routesMap: Hash<RouteItem> = {};

    /**
     * Ctr
     * @param router Router
     */
    constructor(logger: Console, router: Express.Router) {
        this.logger = logger;
        this.router = router;
    }

    /**
     * Include routes
     * @param routesMap Hash<any>
     */
    public include(routes: RouteItem[]) {
        console.log(routes);
    }

    /**
     * Register "GET" routes
     * @param url string
     * @param alias string?
     */
    public get(
        url: string,
        handlers: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        this.router?.get(url, handlers);

        if (alias) {
            this.logger.debug("GET " + url + " " + alias);
        }
    }
}

/**
 * Router-Itme type
 */
export class RouteItem {
    public routeType: string = "";
    public path: string = "";
    public alias?: string;
    public handler: Express.RequestHandler | Express.RequestHandler[];

    /**
     * Ctr
     * @param rType
     * @param path
     * @param handler
     * @param alias
     */
    constructor(
        rType: string,
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        this.routeType = rType;
        this.path = path;
        this.handler = handler;
        this.alias = alias;
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static route(
        rType: string,
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return new RouteItem(rType, path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static get(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("get", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static head(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("head", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static post(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("post", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static patch(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("patch", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static put(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("put", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static delete(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("delete", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param rType
     * @param handler
     * @param alias
     */
    public static option(
        path: string,
        handler: Express.RequestHandler | Express.RequestHandler[],
        alias?: string
    ) {
        return this.route("option", path, handler, alias);
    }
}
