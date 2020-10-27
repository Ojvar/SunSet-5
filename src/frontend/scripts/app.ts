import Base from "@Scripts/base";
import { createApp } from "vue";
import AppComponent from "@Components/app-component.vue";

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

    console.log("INit of App.ts");
  }
}

export default new App();
