/**
 * Route data type
 */
export type RouteItemType = {
  baseUrl: string;
  alias: string;
  path: string;
  keys?: Array<RouteKeyType>;
  method: Array<string>;
};

/**
 * Route Arg type
 */
export type RouteKeyType = {
  name: string;
  optional: boolean;
  offset: number;
};
