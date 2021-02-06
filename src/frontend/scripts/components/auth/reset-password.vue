<template lang="pug">
.reset-password-container
    form.reset-password-form
        .form-header.sub-title.is-size-7
            | گذروازه خود را فراموش کرده ام
        b-field
            b-input(
                ref="nationalId",
                custom-class="has-text-centered",
                v-model="optData.nationalId",
                :value="nationalId",
                placeholder="کد ملی",
                rounded,
                minlength="10",
                maxlength="10",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="کد ملی را عدد 10 رقمی وارد کنید"
            )

        b-field
            b-input(
                custom-class="has-text-centered",
                v-model="optData.phoneNumber",
                :value="phoneNumber",
                placeholder="تلفن همراه",
                rounded,
                minlength="11",
                maxlength="11",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="تلفن همراه را عدد 11 رقمی وارد کنید"
            )

        .field
            .buttons.columns
                .column.is-7
                    b-button(
                        expanded,
                        rounded,
                        @click.prevent="requestForgetPasswordToken",
                        type="is-primary"
                    ) تایید
                .column.is-5
                    b-button(
                        rounded,
                        @click.prevent="changeFormModeToLogin",
                        type="is-text"
                    ) انصراف

    b-modal(:active.sync="isModalActive", scroll="keep", auto-focus)
        otp-modal(@on-cancel-modal="hideModal", @on-otp-confirm="otpConfirm")

    b-modal(:active.sync="isResetModalActive", scroll="keep")
        reset-password-form-modal(
            @on-cancel-modal="hideResetModal",
            @on-save="savePassword"
        )
</template>

<script lang="ts">
import Vue from "vue";
import OtpModalComponent from "@FE/Components/auth/otp-modal.vue";
import ResetPasswordFormModalComponent from "@FE/Components/auth/reset-password-form-modal.vue";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { OtpResponseType } from "@Lib/types/frontend/auth/opt-response-type";
import { UserLoginDataType } from "@Lib/types/frontend/auth/user-login-data-type";
import { UserLoginOtpType } from "@Lib/types/frontend/auth/user-login-otp-type";
import { UserResetPasswordType } from "@Lib/types/frontend/auth/user-reset-password";
import LoginStore, { LoginStoreActions } from "@FE/Scripts/stores/login-store";
import NotifyModule from "@FE/Scripts/modules/notify-module";

/**
 * Reset Password Form Data Type
 */
export type ResetPasswordFormDataType = {
    loginData: UserLoginDataType;
    optData: UserLoginOtpType;
    nationalId: string;
    phoneNumber: string;
    token: string;
    activationCode: string;
    isResetModalActive: boolean;
    isModalActive: boolean;
};

/**
 * Reset password
 */
export default Vue.extend({
    name: "ResetPassword",

    components: {
        OtpModal: OtpModalComponent,
        ResetPasswordFormModal: ResetPasswordFormModalComponent
    },

    store: LoginStore,

    data: () => ({
        loginData: {} as UserLoginDataType,
        optData: {} as UserLoginOtpType,
        nationalId: "",
        phoneNumber: "",
        token: "",
        activationCode: "",
        isResetModalActive: false,
        isModalActive: false
    }),

    /**
     * Mounted
     */
    mounted() {
        (this.$refs.nationalId as HTMLInputElement).focus();
    },

    /**
     * Methods
     */
    methods: {
        /**
         * request forget password
         */
        async requestForgetPasswordToken() {
            /* Attempt to reset password */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.requestForgetPasswordToken,
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
         * save password
         */
        async savePassword(data: any) {
            const userResetPasswordData: UserResetPasswordType = {
                token: this.token,
                activationCode: this.activationCode,
                newPassword: data.data.savePassword
            };

            /* Attempt to reset password */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.resetPassword,
                userResetPasswordData
            );

            /* Notify user */
            if (result.success) {
                NotifyModule.showSuccess(this.$buefy, "کد تایید پیامک شد");
                this.changeFormModeToLogin();
            } else {
                NotifyModule.showDanger(this.$buefy, result.data);
            }
        },

        /**
         * Show modal
         */
        showModal() {
            Vue.set(this, "isModalActive", true);
        },

        /**
         * Hide modal
         */
        hideModal() {
            Vue.set(this, "isModalActive", false);
        },

        /**
         * Hide reset password modal
         */
        hideResetModal() {
            Vue.set(this, "isResetModalActive", false);

            this.changeFormModeToLogin();
        },

        /**
         * Show reset password modal
         */
        showResetPasswordModal() {
            Vue.set(this, "isResetModalActive", true);
        },

        /**
         * Otp confirm
         */
        async otpConfirm(data: any) {
            this.activationCode = data.data.activationCode;

            const otpData: OtpResponseType = {
                activationCode: data.data.activationCode,
                token: this.token
            };

            /* Attempt to login */
            const result: ActionResultType = await this.$store.dispatch(
                LoginStoreActions.checkUserActivationCodeResetPassword,
                otpData
            );

            /* Notify user */
            if (result.success) {
                this.hideModal();
                this.showResetPasswordModal();
            } else {
                NotifyModule.showDanger(this.$buefy, result.data);
            }
        },

        /**
         * change Form Mode To Login
         */
        changeFormModeToLogin() {
            this.$emit("on-change-form-mode", {
                sender: this
            });
        }
    }
});
</script>

<style scoped>
.reset-password-form input {
    text-align: center !important;
}

.form-header {
    margin: 0px 9px 9px 0px;
}
</style>
