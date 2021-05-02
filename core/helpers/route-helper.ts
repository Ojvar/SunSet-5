import { RequestHandler } from "express";
import { stringify } from "qs";

/**
 * Router-Itme class
 */
export class RouteItem {
    public routeType: string = "";
    public path: string = "";
    public alias?: string;
    public handler: RequestHandler | RequestHandler[];

    /**
     * Ctr
     * @param rType {RequestType}
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    constructor(
        rType: RequestType,
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        this.routeType = rType;
        this.path = path;
        this.handler = handler;
        this.alias = alias;
    }

    /**
     * Generate a routeItem
     * @param rType {RequestType}
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static route(
        rType: RequestType,
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return new RouteItem(rType, path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static get(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("get", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static head(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("head", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static post(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("post", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static patch(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("patch", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static put(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("put", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static del(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("delete", path, handler, alias);
    }

    /**
     * Generate a routeItem
     * @param path {string}
     * @param handler {RequestHandler | RequestHandler[]}
     * @param alias {string?}
     */
    public static option(
        path: string,
        handler: RequestHandler | RequestHandler[],
        alias?: string
    ) {
        return this.route("option", path, handler, alias);
    }
}

export type RequestType =
    | "head"
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "option";

/**
 * Apply arguments on url path
 * @param url {string}
 * @param args {any}
 * @param queryString {any} Arguments
 */
export function applyArguments(
    url: string,
    args: any = {},
    queryString: any = {}
): string {
    /* Extract tokens */
    const tokens: RegExpMatchArray | null = url.match(/\:\b(?!\d)\w*\b/g);

    let result = url;

    /* Apply arguments string */
    if (tokens) {
        tokens.forEach((key) => {
            const field = key.replace(/[:?]/g, "");
            const regexStr = `${key}\\??`;
            const regex = new RegExp(regexStr, "g");

            result = result.replace(regex, args[field] ? args[field] : "");
        });
    }

    /* Apply query string */
    if (Object.keys(queryString).length > 0) {
        result += "?" + stringify(queryString);
    }

    return result;
}
