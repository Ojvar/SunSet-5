import { RouteHelper } from "@APP/helpers/route-helper";
import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { RouteItem } from "@CORE/helpers/route-helper";

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", RouteHelper.action("auth@login"), "auth.login"),
    RouteItem.get(
        "/logout",
        [PassportMiddleware.logout(), RouteHelper.action("auth@logout")],
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
            RouteHelper.action("auth@attempToLogin"),
        ],
        "auth.attempt-to-login"
    ),
];
