import { HomeController } from "@CONTROLLERS/home-controller";
import { PassportMiddleware } from "./../app/middlewares/passport-middleware";
import { RouteItem } from "core/helpers/route-helper";

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
        [
            PassportMiddleware.isLoggedin(),
            controller.privatePage.bind(controller),
        ],
        "home.private-page"
    ),
];
