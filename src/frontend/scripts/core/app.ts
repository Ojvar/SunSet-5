import RouterHelper from "@Core/Helpers/route-helper";
import IHash from "@Lib/interfaces/hash-interface";
import { RouteFileType, RouteItemType } from "@Lib/types/core/route-data-type";
import Base from "./base";
import * as X from "@PUBLIC/router-manifest.json";

/**
 * App class
 */
export class App extends Base {
  private routesData: RouteFileType = {} as RouteFileType;

  /**
   * Constructor
   */
  constructor() {
    super();

    // import("@PUBLIC/router-manifest.json").then((res) => {
    //   this.routesData = res.default || res;
    // });
    this.routesData = X;
  }

  /**
   * Get a route data
   * @param name string Route name
   */
  public route(name: string): RouteItemType {
    const route: RouteItemType = this.routesData.routes[name];

    if (undefined == route) {
      throw new Error("Route not found");
    }

    return route;
  }

  /**
   * Get a route path
   * @param name string Route name
   */
  public routePath(name: string, args: IHash<string> = {}): string {
    const route: RouteItemType = this.route(name);

    return RouterHelper.getRoute(route, args, this.routesData.url);
  }
}

export default new App();
