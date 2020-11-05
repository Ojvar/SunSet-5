import { createApp } from "vue";
import Base from "@FE/Scripts/base";
import AppComponent from "@FE/Components/app-component.vue";

/**
 * App class
 */
export class App extends Base {
  /**
   * Ctr
   */
  constructor() {
    super();
    this.init();
  }

  /**
   * Init
   */
  private init() {
    const app = createApp(AppComponent);
    app.mount("#app");

    console.log("Init of App.ts");
  }
}

export default new App();
