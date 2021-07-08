import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { ActionHelper } from "@CORE/helpers/action-helper";
import { RouteItem } from "@CORE/helpers/route-helper";

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", ActionHelper.action("auth@login"), "auth.login"),
    RouteItem.get(
        "/logout",
        [PassportMiddleware.logout(), ActionHelper.action("auth@logout")],
        "auth.logout"
    ),

    /* Google OAuth routes */
    RouteItem.get(
        "/google",
        PassportMiddleware.googleOAuthLogin(),
        "auth.google"
    ),
    RouteItem.get(
        "/google/callback",
        [
            PassportMiddleware.googleOAuth(),
            PassportMiddleware.redirectToHomePage(),
        ],
        "auth.google.callback"
    ),

    RouteItem.post(
        "/login",
        [
            AttempToLoginValidator.validate(),
            PassportMiddleware.localAuth(),
            ActionHelper.action("auth@attempToLogin"),
        ],
        "auth.attempt-to-login"
    ),
];
