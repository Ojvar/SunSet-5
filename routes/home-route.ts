import { HomeController } from "@CONTROLLERS/home-controller";
import { RouteItem } from "@CORE/helpers/route-helper";
import { PassportMiddleware } from "@APP/middlewares/passport-middleware";

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
            PassportMiddleware.isLoggedIn(),
            controller.privatePage.bind(controller),
        ],
        "home.private-page"
    ),
];
