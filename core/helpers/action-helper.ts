import { config as ServerConfig } from "@CONFIGS/core/server";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import { Hash } from "@TYPES/hash-type";
import { NextFunction, Request, RequestHandler, Response } from "express";

export class ActionHelper {
    public static controllers: Hash<any> = {};

    /**
     * Get action route
     * @param name {string}
     */
    public static action(name: string): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const tokens = name.split("@");

            if (tokens.length != 2) {
                throw Error("Invalid name : " + name);
            }

            const methodName = tokens[1];
            let controllerName = tokens[0];
            controllerName += controllerName.endsWith("-controller")
                ? ""
                : "-controller";

            /* Load controller */
            let controller = this.controllers[controllerName];
            if (!controller) {
                const path: string = GlobalMethods.rPath(
                    ServerConfig().basePath,
                    "app/controllers",
                    controllerName
                );

                controller = await import(path);
                controller =
                    controller.default ||
                    Object.values(controller).find(
                        (x: any) => -1 < x.toString().indexOf("Controller")
                    );

                controller = new controller();
                this.controllers[controllerName] = controller;
            }

            await (controller as any)[methodName].bind(controller)(
                req,
                res,
                next
            );
        };
    }
}
