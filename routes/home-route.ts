import { HomeController } from "@CONTROLLERS/home-controller";
import { RouteItem } from "core/helpers/route-helper";
import { isLoggedin } from "./../app/middlewares/passport-middleware";

const controller: HomeController = new HomeController();

export const routeBase: string = "/";
export const routes: RouteItem[] = [
    RouteItem.get("/", controller.index.bind(controller), "home.index"),
    RouteItem.get("/about", controller.about.bind(controller), "home.about"),
    RouteItem.get(
        "/reportIssue",
        controller.reportIssue.bind(controller),
        "home.reposrt-issue"
    ),

    RouteItem.get(
        "/privatePage",
        [isLoggedin, controller.privatePage.bind(controller)],
        "home.private-page"
    ),
];
