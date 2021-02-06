<template lang="pug">
.container
    form.login-form
        .form-header.sub-title.is-size-7
            | ورود به سامانه

        b-field
            b-select(v-model="selectedOption", rounded, expanded)
                option(v-for="option in options", :value="option.value")
                    | {{ option.text }}

        b-field
            b-input(
                ref="nationalId",
                custom-class="has-text-left",
                v-model="loginData.nationalId",
                placeholder="کد ملی",
                rounded,
                minlength="10",
                maxlength="10",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="کد ملی را عدد 10 رقمی وارد کنید",
                @keyup.native.enter="userLogin"
            )

        b-field
            b-input(
                v-if="selectedOption == 'pwd'",
                custom-class="has-text-left",
                v-model="loginData.password",
                type="password",
                placeholder="گذرواژه",
                password-reveal="",
                :icon-clickable="true",
                rounded,
                required,
                validation-message="گذرواژه مورد نظر خود را وارد کنید",
                @keyup.native.enter="userLogin"
            )

        a.is-size-7.small-dark-grey.forgot-pwd(
            href="#",
            @click.prevent="setResetPasswordFormMode",
            v-if="selectedOption == 'pwd'",
        )
            | گذرواژه خود را فراموش کرده ام

        b-field
            b-input(
                v-if="selectedOption == 'otp'",
                custom-class="has-text-left",
                v-model="optData.phoneNumber",
                placeholder="تلفن همراه",
                rounded,
                minlength="11",
                maxlength="11",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="تلفن همراه را عدد 11 رقمی وارد کنید",
            )

        .field
            .buttons.columns
                .column.is-7
                    b-button(
                        v-if="selectedOption == 'pwd'",
                        expanded,
                        rounded,
                        @click.prevent="userLogin",
                        type="is-primary"
                    ) ورود

                    b-button(
                        v-if="selectedOption == 'otp'",
                        expanded,
                        rounded,
                        @click.prevent="otpLogin",
                        type="is-primary"
                    ) ارسال پیامک

                .column.is-5
                    b-button(
                        rounded,
                        @click.prevent="changeFormModeToRegister",
                        type="is-text"
                    ) ثبت نام

        b-modal(:active.sync="isModalActive", scroll="keep")
            otp-modal(
                @on-cancel-modal="hideModal",
                @on-otp-confirm="otpConfirm"
            )
</template>

<script lang="ts">
import Vue from "vue";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { OtpResponseType } from "@Lib/types/frontend/auth/opt-response-type";
import { UserLoginDataType } from "@Lib/types/frontend/auth/user-login-data-type";
import { UserLoginOtpType } from "@Lib/types/frontend/auth/user-login-otp-type";
import LoginStore, { LoginStoreActions } from "@FE/Scripts/stores/login-store";
import OtpModalComponent from "@FE/Components/auth/otp-modal.vue";
import PageHelper from "@FE/Scripts/helpers/page-helper";
import NotifyModule from "@FE/Scripts/modules/notify-module";

/**
 * Events
 */
export enum LoginFormEvents {
    onChangeFormModeRegister = "on-change-form-mode-register",
    onChangeFormModeReset = "on-change-form-mode-reset",
}

/**
 * Login form
 */
export default Vue.extend({
    name: "LoginForm",

    store: LoginStore,

    components: {
        OtpModal: OtpModalComponent,
    },

    data: () => ({
        loginData: {} as UserLoginDataType,
        optData: {} as UserLoginOtpType,

        token: "",

        selectedOption: null,
        options: [],

        isModalActive: false,
    }),

    watch: {
        selectedOption(newValue) {
            this.focusNationalId();
        },
    },

    /**
     * Created
     */
    created() {
        this.prepareData();
    },

    /**
     * Mounted
     */
    mounted() {
        this.focusNationalId();
    },

    /**
     * Methods
     */
    methods: {
        /**
         * Focus on NationalId
         */
        focusNationalId() {
            if (this.$refs.nationalId) {
                (this.$refs.nationalId as HTMLInputElement).focus();
            }
        },

        /**
         * User login
         */
        async userLogin(): Promise<void> {
            /* Attempt to login */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.loginByUserData,
                this.loginData
            );

            /* Notify user */
            if (result.success) {
                PageHelper.redirect(result.data);
            } else {
                NotifyModule.showDanger(this.$buefy, result.data);
            }
        },

        /**
         * OptLogin
         */
        async otpLogin(): Promise<void> {
            Vue.set(this.optData, "nationalId", this.loginData.nationalId);

            /* Attempt to login */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.requestOTPToken,
                this.optData
            );

            /* Notify user */
            if (result.success) {
                Vue.set(this, "token", result.data);

                this.showModal();
                NotifyModule.showSuccess(this.$buefy, "کد تایید پیامک شد");
            } else {
                NotifyModule.showDanger(this.$buefy, result.data);
            }
        },

        /**
         * otp confirm
         */
        async otpConfirm(data: any): Promise<void> {
            const otpData: OtpResponseType = {
                activationCode: data.data.activationCode,
                token: this.token,
            };

            /* Attempt to login */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.loginByOtpToken,
                otpData
            );

            /* Notify user */
            if (result.success) {
                PageHelper.redirect(result.data);
            } else {
                NotifyModule.showDanger(this.$buefy, result.data);
            }
        },

        /**
         * Prepare data
         */
        prepareData(): void {
            Vue.set(this, "options", [
                { text: "گذرواژه", value: "pwd" },
                { text: "یکبار رمز", value: "otp" },
            ]);

            Vue.set(this, "selectedOption", "pwd");
        },

        /**
         * change Form Mode To Register
         */
        changeFormModeToRegister(): void {
            this.$emit(LoginFormEvents.onChangeFormModeRegister, {
                sender: this,
            });
        },

        /**
         * change Form Mode To Register
         */
        setResetPasswordFormMode(): void {
            this.$emit(LoginFormEvents.onChangeFormModeReset, {
                sender: this,
            });
        },

        /**
         * Show modal
         */
        showModal(): void {
            Vue.set(this, "isModalActive", true);
        },

        /**
         * Hide modal
         */
        hideModal(): void {
            Vue.set(this, "isModalActive", false);
        },
    },
});
</script>

<style scoped>
.form-header {
    margin: 0px 9px 9px 0px;
}
</style>
