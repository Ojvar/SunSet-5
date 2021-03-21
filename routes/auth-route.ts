import { AttempToLoginValidator } from "@APP/validators/auth/attempt-to-login-validator";
import { AuthController } from "@CONTROLLERS/auth-controller";
import { PassportMiddleware } from "@APP/middlewares/passport-middleware";
import { RouteItem } from "core/helpers/route-helper";

const controller: AuthController = new AuthController();

export const routeBase: string = "/auth";
export const routes: RouteItem[] = [
    RouteItem.get("/login", controller.login.bind(controller), "auth.login"),
    RouteItem.get("/test", (req, res, next) => {
        res.send(req.user);
    }),

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
