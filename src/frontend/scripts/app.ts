import Base from "@Scripts/base";

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
    console.log("INit of App.ts");
  }
}

export default new App();
