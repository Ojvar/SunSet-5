import { yellow } from "chalk";
import IHash from "@Lib/interfaces/hash-interface";
import { RouteItemType, RouteKeyType } from "@Lib/types/core/route-data-type";

/**
 * Router helper
 */
export default class RouterHelper {
  /**
   * Get route path with applied arguments
   */
  public static getRoute(
    route: RouteItemType,
    args: IHash<string>,
    serverUrl: string
  ): string {
    if (null == route) {
      throw new Error(`Route ${yellow(name)} not found`);
    }

    /* Perpare */
    let keys: Array<RouteKeyType> = route.keys || [];
    let routePath = route.path;
    let baseUrl = route.baseUrl;

    /*  Apply arguments */
    keys.forEach((key) => {
      const newValue: string = args[key.name] || "";
      const argKey = `/\\:${key.name}${key.optional ? "\\??" : ""}`;
      const regexp = new RegExp(argKey, "g");

      routePath = routePath.replace(regexp, `/${newValue}`);
    });

    /* Generate result */
    let result = `${serverUrl}${baseUrl}${routePath}`;

    return result;
  }
}
