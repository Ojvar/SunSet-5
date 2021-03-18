import { Vue, VueRouter } from "@Scripts/vendors/vue";

import { LoadingMixin } from "@Scripts/vue-mixins/loading-mixin";
import { VueRouterMixin } from "@Scripts/vue-mixins/vue-router-mixin";
import { routes } from "@Scripts/pages/home/routes";

/**
 * AppLayout class
 */
export class AppLayout {
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
        const router = new VueRouter({
            routes,
        });

        new Vue({
            el: "#app",

            mixins: [VueRouterMixin(), LoadingMixin()],
            router,
        });
    }
}

new AppLayout();
