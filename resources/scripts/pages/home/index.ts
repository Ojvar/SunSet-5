import { Vue } from "@Scripts/vendors/vue";
import { LoadingMixin } from "@Scripts/vue/mixins/loading-mixin";

/**
 * HomePage class
 */
export class HomePage {
    /**
     * Ctr
     */
    constructor() {
        this.initVue();
    }

    /**
     * Init Vue
     */
    private initVue() {
        new Vue({
            el: "#app",

            mixins: [LoadingMixin()],
        });
    }
}

new HomePage();
