import { RouterItemType } from "@Lib/types/core/router-item-type";
import { IRouter } from "express";
import IHash from "../hash-interface";

/**
 * BaseRouter interface
 */
export interface IBaseRouter {
  /**
   * Get baseUrl
   */
  getBaseUrl(): string;

  /**
   * Get router
   */
  getRouter(): IRouter;

  /**
   * Get routes list
   */
  getRoutes(): IHash<IRouter>;

  /**
   * Get routes list in JSON format
   * @returns IHash<RouterItemType> Routes list data
   */
  getRoutesList(): IHash<RouterItemType>;

  /**
   * Apply routers
   * @param Express Express.IRouter
   */
  apply(app: IRouter): void;
}
