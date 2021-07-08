import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { ActionHelper } from "@CORE/helpers/action-helper";
import { RouteItem } from "@CORE/helpers/route-helper";

export const routeBase: string = "/";
export const routes: RouteItem[] = [
    RouteItem.get("/", ActionHelper.action("home@index"), "home.index"),
    RouteItem.get("/about", ActionHelper.action("home@about"), "home.about"),

    RouteItem.get(
        "/reportIssue",
        ActionHelper.action("home@reportIssue"),
        "home.reposrt-issue"
    ),

    RouteItem.get(
        "/privatePage",
        [
            PassportMiddleware.isLoggedIn(),
            ActionHelper.action("home@privatePage"),
        ],
        "home.private-page"
    ),
];
