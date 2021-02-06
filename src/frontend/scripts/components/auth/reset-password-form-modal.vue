<template lang="pug">
section.modal-card-body
    .columns.is-justify-content-center
        .column.is-9
            .modal-header-container.mb-6
                .modal-header-icon.columns.is-justify-content-center.pt-5
                    .lock
                .modal-header-text.columns.is-justify-content-center.has-text-grey-light.pt-2
                    span
                        | تغییر گذرواژه
            b-field
                b-input(
                    custom-class="has-text-left",
                    v-model="password",
                    :value="password",
                    type="password",
                    placeholder="گذرواژه",
                    password-reveal="",
                    :icon-clickable="true",
                    rounded,
                    required,
                    validation-message="گذرواژه مورد نظر خود را وارد کنید"
                )

            b-field
                b-input(
                    custom-class="has-text-left",
                    v-model="password_confirmation",
                    :value="password_confirmation",
                    type="password",
                    placeholder="تایید گذرواژه",
                    password-reveal="",
                    :icon-clickable="true",
                    rounded,
                    required,
                    validation-message="تایید گذرواژه را وارد کنید"
                )
            .buttons.columns.is-justify-content-center.mt-6
                .column.is-7
                    b-button(
                        expanded,
                        rounded,
                        @click.prevent="savePassword",
                        type="is-primary"
                    ) ذخیره
                .column.is-5
                    b-button(
                        rounded,
                        @click.prevent="hideResetModal",
                        type="is-text"
                    ) انصراف
</template>

<script lang="ts">
import Vue from "vue";

/**
 * OtpModal
 */
export default Vue.extend({
    name: "OtpModal",

    data: () => ({
        password: null,
        password_confirmation: null
    }),

    /**
     * Methods
     */
    methods: {
        /**
         * hide modal
         */
        hideResetModal() {
            this.$emit("on-cancel-modal", {
                sender: this
            });
        },

        /**
         * save new password
         */
        savePassword() {
            if (this.password == this.password_confirmation) {
                this.$emit("on-save", {
                    sender: this,
                    data: {
                        savePassword: this.password
                    }
                });
            } else {
                this.notify(
                    "گذرواژه و تایید گذرواژه می بایست باهم برابر باشد",
                    "is-danger"
                );
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
        }
    }
});
</script>

<style scoped>
.modal-header-icon .lock {
    background: url("~@IMAGES/lock.png") no-repeat;
    background-size: contain;
    width: 64px;
    height: 64px;
}

.partitioned {
    padding-left: 15px;
    letter-spacing: 42px;
    border: 0;
    background-image: linear-gradient(
        to left,
        black 70%,
        rgba(255, 255, 255, 0) 0%
    );
    background-position: bottom;
    background-size: 50px 1px;
    background-repeat: repeat-x;
    background-position-x: 35px;
    width: 220px;
}
</style>
