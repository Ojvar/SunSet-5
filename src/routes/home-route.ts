import HomeController from "@BE/Controllers/home-controller";
import BaseRouter from "@Core/Helpers/base-router-helper";

/**
 * Home router
 */
export default class HomeRoute extends BaseRouter {
  private homeController: HomeController = new HomeController();

  /**
   * Constructor
   */
  constructor() {
    super("/home", "HomeRoute");
    this.defineRoutes();
  }

  /**
   * Define routes
   */
  private defineRoutes(): void {
    super.get("/", [this.homeController.index], "home.index");
    super.get("/t1", [this.homeController.index], "home.t1");
    super.get("/t2", [this.homeController.index], "home.t2");
  }
}
