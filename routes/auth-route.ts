import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { AuthController } from "@CONTROLLERS/auth-controller";
import { RouteItem } from "@CORE/helpers/route-helper";

const controller: AuthController = new AuthController();

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", controller.login.bind(controller), "auth.login"),
    RouteItem.get(
        "/logout",
        [PassportMiddleware.logout(), controller.logout.bind(controller)],
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
            controller.attempToLogin.bind(controller),
        ],
        "auth.attempt-to-login"
    ),
];
