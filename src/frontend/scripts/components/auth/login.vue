<template lang="pug">
.login-container
    .container
        .columns.is-align-items-center.is-fullheight.is-gapless
            .column.is-3
                logo

                .logo-title
                    | سازمان نظام مهندسی ساختمان استان قزوین

                transition(name="fade", mode="out-in")
                    router-view(
                        @on-change-form-mode-register="setRegisterFormMode",
                        @on-change-form-mode-reset="setResetPasswordFormMode",
                        @on-change-form-mode="setLoginFormMode"
                    )
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";

Vue.use(VueRouter);
Vue.use(Buefy, {
    defaultIconPack: "fas",
});

import LoginStore from "@FE/Scripts/stores/login-store";

/**
 * Define vue-router
 */
const router = new VueRouter({
    routes: [
        {
            path: "/login-form",
            component: () => import("@FE/Components/auth/login-form.vue"),
        },
        {
            path: "/register",
            component: () => import("@FE/Components/auth/register.vue"),
        },
        {
            path: "/reset-password",
            component: () => import("@FE/Components/auth/reset-password.vue"),
        },
    ],
});

/**
 * Login
 */
export default Vue.extend({
    name: "Login",

    store: LoginStore,

    router,

    components: {
        Logo: () => import("@FE/Components/global/logo.vue"),
    },

    /**
     * Mounted
     */
    mounted() {
        setTimeout(() => this.setLoginFormMode(), 2500);
    },

    /**
     * Methods
     */
    methods: {
        /**
         * Change form
         */
        changeForm(formName: string) {
            if ((this.$router.currentRoute || {}).path != formName) {
                this.$router.push(formName);
            }
        },

        /**
         * Set form-mode to view
         */
        setLoginFormMode() {
            this.changeForm("/login-form");
        },

        /**
         * Set form-mode to register
         */
        setRegisterFormMode() {
            this.changeForm("/register");
        },

        /**
         * Set form-mode to reset password
         */
        setResetPasswordFormMode() {
            this.changeForm("/reset-password");
        },
    },
});
</script>

<style scoped>
.login-container {
    background: #f7f7f7 url("~@IMAGES/log-in-plan.png");
    height: 100vh;
    background-size: cover;
}

.logo {
    background: url("~@IMAGES/qeng.png") no-repeat;
    background-size: cover;
    width: 105px;
    height: 85px;
}

.logo-title {
    font-size: 1.1rem;
    font-weight: 100;
    color: #494646;
    text-align: center;
    padding: 3px 15px 40px 15px;
}

.control .help.counter {
    display: none;
}

.has-text-left input {
    text-align: left !important;
}

.forgot-pwd {
    margin-top: -0.7rem;
    display: block;
    margin-right: 1rem;
    margin-bottom: 1rem;
}

.login-form input {
    text-align: center;
}

.modal .modal-content {
    background: #fff;
    border-radius: 25px;
    box-shadow: 0px 4px 7px #c7c7c7;
    max-width: 420px;
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
