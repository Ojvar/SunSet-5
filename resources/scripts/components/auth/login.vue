<template lang="pug">
.section
    h1.has-text-centered.title.is-1.has-text-primary
        | Login to system
    .columns.is-centered
        .column.is-5
            .form
                .field
                    label.label Email
                    .control
                        input.input(
                            type="email",
                            v-model="userLoginData.email"
                        )
                .field
                    label.label Password
                    .controlr
                        input.input(
                            type="password",
                            v-model="userLoginData.pwd"
                        )
                .field.is-grouped
                    .contorol
                        a.button.is-primary(@click.prevent="login")
                            | Login
                    .contorol
                        a.button.is-default(@click.prevent="loginByGoogle")
                            | Login By GOOGLE
</template>

<script lang="ts">
import { ActionResultType } from "@Lib/types/global/action-result-type";
import { PageHelper } from "@Scripts/helpers/page-helper";
import { Vue } from "@Scripts/vendors/vue";
import { LoginStore, UserLoginDataType } from "@VueC/auth/store";

/**
 * Extends Vue
 */
export default Vue.extend({
    /**
     * Set store
     */
    async beforeCreate() {
        this.$store = LoginStore();
        await this.$store.dispatch("init");
    },

    computed: {
        userLoginData(): UserLoginDataType {
            return this.$store.getters.userLoginData;
        },
    },

    methods: {
        /**
         * LoginByGoogle
         */
        async loginByGoogle() {
            try {
                this.$store.dispatch("loginByGoogle");
            } catch (err) {
                console.error(err);
                alert("Send request fialed");
            }
        },

        /**
         * Login to system
         */
        async login() {
            try {
                const data: ActionResultType = await this.$store.dispatch(
                    "attemptToLogin"
                );

                if (data.success) {
                    PageHelper.redirect(data.data);
                } else {
                    alert(data.data);
                }
            } catch (err) {
                console.error(err);
                alert("Send request fialed");
            }
        },
    },
});
</script>