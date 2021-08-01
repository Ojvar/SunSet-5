import { routes } from "@Scripts/pages/auth/routes";
import { Vue, VueRouter } from "@Scripts/vendors/vue";
import { LoadingMixin } from "@Scripts/vue/mixins/loading-mixin";
import { VueRouterMixin } from "@Scripts/vue/mixins/vue-router-mixin";

/**
 * LoginPage class
 */
export class LoginPage {
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

            /**
             * Created
             */
            created() {
                this.changePage({
                    name: "auth.login",
                });
            },
        });
    }
}

new LoginPage();
