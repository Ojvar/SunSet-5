<template lang="pug">
.register-container
    form.user-register-form
        .form-header.sub-title.is-size-7
            | ایجاد حساب کاربری
        b-field
            b-input(
                ref="nationalId",
                custom-class="has-text-centered",
                v-model="nationalId",
                :value="nationalId",
                placeholder="کد ملی",
                rounded,
                minlength="10",
                maxlength="10",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="کد ملی را عدد 10 رقمی وارد کنید."
            )

        b-field
            b-input(
                custom-class="has-text-centered",
                v-model="phoneNumber",
                :value="phoneNumber",
                placeholder="تلفن همراه",
                rounded,
                minlength="11",
                maxlength="11",
                pattern="[0-9]*",
                :has-counter="false",
                validation-message="تلفن همراه را عدد 11 رقمی وارد کنید."
            )
        b-field
            b-input(
                custom-class="has-text-centered",
                v-model="firstName",
                :value="firstName",
                placeholder="نام",
                rounded,
                minlength="3",
                maxlength="50",
                :has-counter="false",
                validation-message="نام حداقل ۳ کاراکتر می باشد."
            )
        b-field
            b-input(
                custom-class="has-text-centered",
                v-model="lastName",
                :value="lastName",
                placeholder="نام خانوادگی",
                rounded,
                minlength="3",
                maxlength="50",
                :has-counter="false",
                validation-message="نام خانوادگی حداقل ۳ کاراکتر می باشد."
            )

        .field
            .buttons.columns
                .column.is-7
                    b-button(
                        expanded,
                        rounded,
                        @click.prevent="userRegister",
                        type="is-primary"
                    ) ثبت
                .column.is-5
                    b-button(
                        rounded,
                        @click.prevent="changeFormModeToLogin",
                        type="is-text"
                    ) انصراف

    b-modal(:active.sync="isModalActive", scroll="keep")
        otp-modal(@on-cancel-modal="hideModal", @on-otp-confirm="otpConfirm")
</template>

<script lang="ts">
import Vue from "vue";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { OtpResponseType } from "@Lib/types/frontend/auth/opt-response-type";
import { UserRegisterType } from "@Lib/types/frontend/auth/user-register-type";
import LoginStore from "@FE/Scripts/stores/login-store";
import OtpModalComponent from "@FE/Components/auth/otp-modal.vue";
import ResetPasswordFormModalComponent from "@FE/Components/auth/reset-password-form-modal.vue";

/**
 * Register
 */
export default Vue.extend({
    name: "Register",

    components: {
        OtpModal: OtpModalComponent,
        ResetPasswordFormModal: ResetPasswordFormModalComponent
    },

    store: LoginStore,

    data: () => ({
        captchaValue: undefined,
        selectedOption: null,
        options: [],
        nationalId: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",

        registerData: {
            success: true,
            failedCount: 2
        },

        isModalActive: false,
        isResetModalActive: false,

        token: "",
        activationCode: ""
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
         * user register
         */
        async userRegister() {
            const newUserData: UserRegisterType = {
                nationalId: this.nationalId,
                phoneNumber: this.phoneNumber,
                firstName: this.firstName,
                lastName: this.lastName
            };

            /* Attempt to register */
            const result: ActionResultType = await this.$store.dispatch(
                "newUserRegisterRequest",
                newUserData
            );

            /* Notify user */
            if (result.success) {
                this.token = result.data;
                this.showModal();
                this.notify("کد تایید پیامک شد.", "is-success");
            } else {
                this.hideModal();
                this.notify(result.data, "is-danger");
            }
        },

        /**
         * notification
         */
        notify(message: string, type: string): void {
            const notif = this.$buefy.notification.open({
                duration: 5000,
                message: message,
                position: "is-bottom-right",
                type: type,
                hasIcon: true
            });
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
                "confirmNewUserRegister",
                otpData
            );

            /* Notify user */
            if (result.success) {
                this.hideModal();
                this.notify(result.data, "is-success");

                this.changeFormModeToLogin();
            } else {
                this.notify(result.data, "is-danger");
            }
        },

        /**
         * Show reset password modal
         */
        showResetPasswordModal() {
            Vue.set(this, "isResetModalActive", true);
        },

        /**
         * change form mode to login
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
.register-form input {
    text-align: center !important;
}

.form-header {
    margin: 0px 9px 9px 0px;
}
</style>
