import { Vue } from "@Scripts/vendors/vue";

/**
 * VueRouter mixin
 */
export const VueUIMixin = () => {
    return Vue.extend({
        methods: {
            /**
             * Focus on an element
             * @param element {string}
             */
            focus(element: string) {
                (this.$refs[element] as HTMLElement)?.focus();
            },
        },
    });
};
