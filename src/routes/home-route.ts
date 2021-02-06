import HomeController from "@BE/Controllers/home-controller";
import BaseRouter from "@Core/Helpers/base-router-helper";

/**
 * Home router
 */
export default class HomeRoute extends BaseRouter {
    /**
     * Constructor
     */
    constructor() {
        super("", "HomeRoute");
        this.defineRoutes();
    }

    /**
     * Define routes
     */
    private defineRoutes(): void {
        const controller: HomeController = new HomeController();

        super.get("/", [controller.index.bind(controller)], "home.index");

        super.get(
            "/logout",
            [controller.logout.bind(controller)],
            "home.logout"
        );
    }
}
