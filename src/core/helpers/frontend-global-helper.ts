import { extname } from "path";
import GlobalMethods from "@Core/Global/global-methods";
import IHash from "@Lib/interfaces/hash-interface";
import { ExpressConfigType } from "@Lib/types/config/express-config-type";
import { RouteArgType, RouteDataType } from "@Lib/types/core/route-data-type";

/**
 * Frontend Global Helper
 */
export default class FrontendGlobalHelper {
  private webpackManifest: IHash<string> = {};
  private appConfig: ExpressConfigType = {} as ExpressConfigType;
  private routesData: IHash<RouteDataType> | undefined;

  /**
   * Load webpack-manifest data
   */
  public async prepare() {
    if (null == this.appConfig.publicPath) {
      await this.loadAppConfig();
    }

    if (undefined == this.routesData) {
      await this.loadRoutesData();
    }

    const webpackManifestData: object = await GlobalMethods.loadModule<any>(
      "dist/public/webpack-manifest.json"
    );

    this.webpackManifest = webpackManifestData as IHash<string>;
  }

  /**
   * Load routes data
   */
  private async loadRoutesData(): Promise<void> {
    const path: string = GlobalMethods.rPath(
      this.appConfig.publicPath,
      "router-manifest.json"
    );

    this.routesData = await GlobalMethods.loadModule<IHash<RouteDataType>>(
      path
    );
  }

  /**
   * Load application-config data
   */
  private async loadAppConfig(): Promise<void> {
    this.appConfig = await GlobalMethods.config<ExpressConfigType>(
      "core/express"
    );
  }

  /**
   * Get route path
   * @param routeName string Route alias
   * @param args IHash<string|number> Arguments
   * @returns string The Route path
   */
  public route(routeName: string, args: IHash<string | number> = {}): string {
    const route: RouteDataType = (this.routesData as IHash<RouteDataType>)[
      routeName
    ];

    /* Perpare */
    let keys: Array<RouteArgType> = route.keys;
    let routePath = route.path;
    let baseUrl = route.baseUrl;

    /*  Apply arguments */
    keys.forEach((key) => {
      const newValue: string = (args[key.name] as string) || "";
      const argKey = `/\\:${key.name}${key.optional ? "\\??" : ""}`;
      const regexp = new RegExp(argKey, "g");

      routePath = routePath.replace(regexp, `/${newValue}`);
    });

    /* Generate result */
    let result = `${baseUrl}${routePath}`;

    return result;
  }

  /**
   * Get full route data
   * @param routeName string Route alias
   * @param args Array[string|number] Arguments
   * @returns string The Route data
   */
  public routeData(routeName: string): RouteDataType {
    let route: RouteDataType = (this.routesData as IHash<RouteDataType>)[
      routeName
    ];

    return route;
  }

  /**
   * Mix function
   * @param url string Url path
   * @returns string The compiled url
   */
  public mix(url: string): string {
    if (url.startsWith("/")) {
      url = url.substr(1);
    }

    const ext = extname(url).replace(".", "");
    url = url.replace(new RegExp(`\.${ext}$`, "g"), "");

    const routeData: any = this.webpackManifest[url];
    url = routeData[ext] as string;
    url = `${this.appConfig.url}${url}`;

    return url;
  }
}
