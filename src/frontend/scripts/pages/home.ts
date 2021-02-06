import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "vue-router";
import Base from "@FE/Scripts/base";

Vue.use(VueRouter);
Vue.use(Buefy);

/**
 * Home page class
 */
export class HomePage extends Base {
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
        new Vue({
            el: "#app",

            name: "Home",

            components: {
                NewDashboard: () =>
                    import(
                        /* webpackChunkName: "home/dashboard" */
                        "@FE/Components/home/dashboard.vue"
                    ),
            },

            mounted() {},
        });
    }
}

/**
 * Home page instance
 */
export default new HomePage();
