import { RawLocation, Vue } from "@Scripts/vendors/vue";

/**
 * VueRouter mixin
 */
export const VueRouterMixin = () => {
    return Vue.extend({
        methods: {
            /**
             * Change Page
             * @param pathData string | RawLocation
             */
            changePage(pathData: string | RawLocation) {
                if (!this.$route) {
                    return;
                }

                if (typeof pathData == "string") {
                    if (this.$route.path == pathData) {
                        return;
                    }

                    this.$router.push(pathData);
                } else {
                    if (this.$route.name == pathData.name) {
                        return;
                    }

                    this.$router.push(pathData);
                }
            },
        },
    });
};
