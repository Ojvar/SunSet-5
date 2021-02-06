<template lang="pug">
section.modal-card-body
    .columns.is-justify-content-center
        .column.is-9
            .modal-header-container.mb-6
                .modal-header-icon.columns.is-justify-content-center.pt-5
                    .lock
                .modal-header-text.columns.is-justify-content-center.has-text-grey-light.pt-2
                    span
                        | کد تایید برای شما ارسال شد
            .number-input.columns.is-multiline.mb-6
                .column.is-12.has-text-centered
                    label.title.is-size-4
                        | کد تایید
                .column.is-12.has-text-centered
                    input.seprate-char.has-text-centered(
                        ref="token",
                        v-model="activationCode",
                        type="text",
                        inputmode="numeric",
                        pattern="[0-9]*",
                        min-length="6",
                        maxlength="6",
                        value="012345"
                    )
            .buttons.columns.is-justify-content-center
                .column.is-8
                    b-button(
                        expanded,
                        rounded,
                        @click.prevent="otpConfirm",
                        type="is-primary"
                    )
                        | تایید
                .column.is-4
                    b-button(
                        rounded,
                        @click.prevent="hideModal",
                        type="is-text"
                    )
                        | انصراف
</template>

<script lang="ts">
import Vue from "vue";

/**
 * OtpModal
 */
export default Vue.extend({
    name: "OtpModal",

    data: () => ({
        token: null,
        activationCode: null
    }),

    /**
     * Mounted
     */
    mounted() {
        setTimeout(() => (this.$refs.token as HTMLInputElement).focus(), 250);
    },

    /**
     * Methods
     */
    methods: {
        /**
         * hide modal
         */
        hideModal() {
            this.$emit("on-cancel-modal", {
                sender: this
            });
        },

        /**
         * otp confirm
         */
        otpConfirm() {
            this.$emit("on-otp-confirm", {
                sender: this,
                data: {
                    activationCode: this.activationCode,
                    token: this.token
                }
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
</style>
