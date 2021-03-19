import { AuthController } from "@CONTROLLERS/auth-controller";
import { RouteItem } from "core/helpers/route-helper";

const controller: AuthController = new AuthController();

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", controller.login.bind(controller), "auth.login"),
];
