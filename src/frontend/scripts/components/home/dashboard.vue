<template lang="pug">
.container-dashboard
    .columns
        .column.is-1.mt-4.sidebar-first
            .sidebar-top
                .dashboard-item.apps.mb-4
                    a(href="#")

                .dashboard-item.logo.mb-4
                    a(href="/")

                .dashboard-item
                    a(href="/employee/engineer-membership/confirmation")
                        i.far.fa-bell
                        span.notification-count
                            | {{ notificationCount }}
                .dashboard-item
                    i.fas.fa-inbox

            .sidebar-bottom
                //- UserProfile (Image)
                .dashboard-item
                    .is-centered.nav-user-container-icon

                //- Setting
                .dashboard-item
                    i.fas.fa-cog

                //- Sign-out
                .dashboard-item
                    a(href="/logout")
                        i.fas.fa-sign-out-alt

        .column.is-2.mt-4.sidebar-second
            b-collapse(animation="slide", key="0")
                .card-header(slot="trigger", slot-scope="props", role="button")
                    p.card-header-title مهندسین
                    a.card-header-icon
                        b-icon(:icon="props.open ? 'caret-down' : 'caret-up'")
                .card-content
                    .content
                        .dashboard-item
                            router-link(to="/eng-mem-edit") عضویت

        .column.is-9.dashboard-contents
            router-view
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";

Vue.use(VueRouter);
Vue.use(Buefy);

const router = new VueRouter({
    routes: [
        {
            path: "/eng-mem-edit",
            component: () =>
                import(
                    /* webpackChunkName: "runtime" */
                    "@FE/Components/engineer-membership/membership-check-list.vue"
                ),
        },
    ],
});

/**
 * NewDashboard Data type
 */
export type NewDashboardDataType = {
    notificationCount: number;
};

export default Vue.extend({
    name: "NewDashboard",

    router,

    data: () =>
        ({
            notificationCount: 0,
        } as NewDashboardDataType),

    computed: {
        isActiveEngineerMembership(): boolean {
            return true;
        },
    },

    methods: {
        /**
         * Get route
         */
        getRoute(route: string): string {
            return "";
        },
    },
});
</script>


<style scoped>
.notification-count {
    position: absolute;
    top: -7px;
    right: 8px;
    font-size: 0.7rem;
    background: #f00;
    color: #fff;
    padding: 2px 4px 0px 4px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    min-height: 18px;
}

.dashboard-item a {
    position: relative;
    color: #4a4a4a;
}
</style>
