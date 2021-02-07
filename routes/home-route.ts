import { RouteItem } from "core/helpers/route-helper";
import { HomeController } from "@CONTROLLERS/home-controller";

const controller: HomeController = new HomeController();

export const routeBase: string = "/";
export const routes: RouteItem[] = [
    RouteItem.get("/", controller.index.bind(controller), "home.index"),
];
