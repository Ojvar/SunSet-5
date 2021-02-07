import { RouteItem } from "core/helpers/route-helper";
import { HomeController } from "@CONTROLLERS/home-controller";

export const routeBase: string = "/";

const controller: HomeController = new HomeController();
export const routes: RouteItem[] = [
    RouteItem.get("/:name/:family?", controller.index.bind(controller), "home.index"),
];
