import { RouteHelper } from "@APP/helpers/route-helper";
import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { HomeController } from "@CONTROLLERS/home-controller";
import { RouteItem } from "@CORE/helpers/route-helper";

const controller: HomeController = new HomeController();

export const routeBase: string = "/";
export const routes: RouteItem[] = [
    RouteItem.get("/", RouteHelper.action("home@index"), "home.index"),
    RouteItem.get("/about", RouteHelper.action("home@about"), "home.about"),

    RouteItem.get(
        "/reportIssue",
        RouteHelper.action("home@reportIssue"),
        "home.reposrt-issue"
    ),

    RouteItem.get(
        "/privatePage",
        [
            PassportMiddleware.isLoggedIn(),
            RouteHelper.action("home@privatePage"),
        ],
        "home.private-page"
    ),
];
