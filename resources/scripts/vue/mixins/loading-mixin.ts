import { Vue } from "@Scripts/vendors/vue";

/**
 * LoadingMixinDataType
 */
export type LoadingMixinDataType = {
    loadingFlag: boolean;
};

/**
 * LoadingMixinDataType mixin
 */
export const LoadingMixin = () => {
    return Vue.extend({
        data: () =>
            ({
                loadingFlag: false,
            } as LoadingMixinDataType),

        computed: {
            isLoading(): boolean {
                return this.loadingFlag;
            },
        },

        methods: {
            /**
             * Show loading
             */
            showLoading(): void {
                Vue.set(this, "loadingFlag", true);
            },

            /**
             * Hide loading
             */
            hideLoading(): void {
                Vue.set(this, "loadingFlag", false);
            },
        },
    });
};
