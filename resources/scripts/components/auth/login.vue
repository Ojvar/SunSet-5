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
</template>

<script lang="ts">
import { Vue } from "@Scripts/vendors/vue";
import { ActionResultType } from "@Lib/types/global/action-result-type";
import { PageHelper } from "@Scripts/helpers/page-helper";
import { LoginStore, UserLoginDataType } from "./login-store";

/**
 * Extends Vue
 */
export default Vue.extend({
    /**
     * Set store
     */
    async beforeCreate() {
        this.$store = new LoginStore();
        await this.$store.dispatch("init");
    },

    computed: {
        userLoginData(): UserLoginDataType {
            return this.$store.getters.userLoginData;
        },
    },

    methods: {
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