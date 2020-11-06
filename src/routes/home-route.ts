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
    super("/", "HomeRoute");
    this.defineRoutes();
  }

  /**
   * Define routes
   */
  private defineRoutes(): void {
    super.get("/", [this.homeController.index], "home.index");
  }
}
