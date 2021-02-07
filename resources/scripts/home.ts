import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

new Vue({
    el: "#app",

    router: new VueRouter({
        routes: [
            {
                path: "/",
                component: {
                    template: `<div>Home Route</div>`,
                },
            },
            {
                path: "/contactUs",
                component: {
                    template: `<div>ContactUs Route</div>`,
                },
            },
        ],
    }),

    components: {
        Logo: () =>
            import(
                /* webpackChunkName: "scripts/components/logo.vue" */
                "@VueC/logo.vue"
            ),
    },

    data: () => ({
        name: "ali",
    }),
});
