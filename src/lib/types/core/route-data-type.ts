/**
 * Route data type
 */
export type RouteDataType = {
  baseUrl: string;
  alias: string;
  path: string;
  keys: Array<RouteArgType>;
  method: Array<string>;
};

/**
 * Route Arg type
 */
export type RouteArgType = {
  name: string;
  optional: boolean;
  offset: number;
};
