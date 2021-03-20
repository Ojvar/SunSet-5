import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { AuthController } from "@CONTROLLERS/auth-controller";
import { RouteItem } from "core/helpers/route-helper";
import { localAuth } from "@APP/middlewares/passport-middleware";

const controller: AuthController = new AuthController();

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", controller.login.bind(controller), "auth.login"),

    RouteItem.post(
        "/login",
        [
            AttempToLoginValidator.validate(),
            localAuth(),
            controller.attempToLogin.bind(controller),
        ],
        "auth.attempt-to-login"
    ),
];
