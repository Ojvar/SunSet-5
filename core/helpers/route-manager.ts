import { config as ServerConfig, ServerConfigType } from "@CONFIGS/core/server";
import { LoggerType } from "@CORE/helpers/global-data-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { applyArguments, RouteItem } from "@CORE/helpers/route-helper";
import { Hash } from "@Lib/types/hash-type";
import Express from "express";
import { lstatSync } from "fs";

export class RouteManager {
    private logger: LoggerType = console;
    private routeFiles: Hash<any> = {};
    private _routesMap: Hash<RouteItemType> = {};
    private config: ServerConfigType = ServerConfig();

    /**
     * Get routes map
     */
    public get routesMap(): Hash<RouteItemType> {
        return this._routesMap;
    }

    /**
     * Ctr
     * @param logger LoggerType
     */
    constructor(logger: LoggerType) {
        this.logger = logger;
    }

    /**
     * Load routes
     */
    public async loadRoutes() {
        const routeFiles: string[] = GlobalMethods.files([
            this.config.basePath,
            "routes",
        ]);

        for (let i = 0; i < routeFiles.length; ++i) {
            const routeFilePath: string = routeFiles[i];

            if (!lstatSync(routeFilePath).isDirectory()) {
                const routeFile: RouteFileType = await import(routeFilePath);
                GlobalMethods.baseName(routeFilePath);

                this.routeFiles[routeFile.routeBase] = routeFile.routes;
            }
        }
    }

    /**
     * Apply routes
     */
    public async applyRoutes(app: Express.Application) {
        const keys: string[] = Object.keys(this.routeFiles);

        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const router: Express.Router = Express.Router();
            const routesList: RouteItem[] = this.routeFiles[key];

            /* Add routes */
            routesList.forEach((route: RouteItem) => {
                switch (route.routeType) {
                    case "get":
                        router.get(route.path, route.handler);
                        break;

                    case "head":
                        router.head(route.path, route.handler);
                        break;

                    case "post":
                        router.post(route.path, route.handler);
                        break;

                    case "put":
                        router.put(route.path, route.handler);
                        break;

                    case "patch":
                        router.patch(route.path, route.handler);
                        break;

                    case "delete":
                        router.delete(route.path, route.handler);
                        break;

                    case "options":
                        router.options(route.path, route.handler);
                        break;
                }

                /* Add to routes list */
                if (route.alias) {
                    const newRoute = router.stack[router.stack.length - 1];
                    let fullRouteName: string = key + newRoute.route.path;

                    if (fullRouteName.startsWith("//")) {
                        fullRouteName = fullRouteName.replace("//", "/");
                    }

                    /* Convert to full-server-url */
                    fullRouteName = this.config.serverUrl + fullRouteName;

                    this._routesMap[route.alias] = {
                        path: fullRouteName,
                        route: newRoute,
                    } as RouteItemType;
                }

                /* Add to app instance */
                app.use(key, router);
            });

            this.logger.info(`Loading route: ${key}`);
        }
    }

    /**
     * Get route data
     * @param alias {string}
     */
    public routeData(alias: string): RouteItemType {
        return this.routesMap[alias];
    }

    /**
     * Get route path
     * @param alias {string}
     * @param data {any}
     */
    public routePath(alias: string, data: any = {}): string {
        return applyArguments(this.routeData(alias).path, data);
    }
}

/**
 * Route file type
 */
export type RouteFileType = {
    routeBase: string;
    routes: RouteItem[];
};

/**
 * RouteItemType
 */
export type RouteItemType = {
    path: string;
    route: any;
};
