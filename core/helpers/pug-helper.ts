import { GlobalData } from "./global-data-helper";
import { GlobalMethods } from "./global-methods-helper";
import { Hash } from "@TYPES/hash-type";
import { RouteItemType } from "./route-manager";
import { config } from "@CONFIGS/core/server";

/**
 * PugHelper class
 */
export class PugHelper {
    private assetsList: Hash<string> | null = null;

    /**
     * Ctr
     */
    constructor() {
        this.loadAssetsList();
    }

    /**
     * Load routes
     */
    public async loadAssetsList(): Promise<void> {
        if (null != this.assetsList) {
            return;
        }

        try {
            const filePath: string = GlobalMethods.rPath(
                `./${config.publicPath}/public/assets-manifest.json`
            );

            this.assetsList = (await import(filePath)).default;
        } catch (err) {
            return err;
        }
    }

    /**
     * Get asset path
     * @param asset
     */
    public mix(asset: string): string {
        const assetPath = (this.assetsList || {})[asset];
        const url: string = `${GlobalData.express?.app.externalUrl}/${assetPath}`;

        return url;
    }

    /**
     * Get route data
     * @param route name
     */
    public route(route: string): RouteItemType | undefined {
        return GlobalData.express?.app.RouteManager.routeData(route);
    }

    /**
     * Get route path
     * @param path name
     */
    public url(route: string): string | undefined {
        return GlobalData.express?.app.RouteManager.routeData(route).path;
    }
}
