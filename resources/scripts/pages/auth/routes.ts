import { RouteConfig } from "@Scripts/vendors/vue";

/**
 * Routes array
 */
export const routes: Array<RouteConfig> = [
    {
        path: "/login",
        name: "auth.login",
        component: () =>
            import(
                /* webpackChunkName: "@VueC/auth/login.vue" */
                "@VueC/auth/login.vue"
            ),
    },

    {
        path: "*",
        name: "not-found",
        component: () =>
            import(
                /* webpackChunkName: "@VueC/global/route-not-found.vue" */
                "@VueC/global/route-not-found.vue"
            ),
    },
];
