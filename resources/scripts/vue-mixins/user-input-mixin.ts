import { PersianHelper } from "@Scripts/helpers/persian-helper";
import { Vue } from "@Scripts/vendors/vue";

/**
 * UserInput mixin
 */
export const UserInputMixin = () => {
    return Vue.extend({
        methods: {
            /**
             * Focus on an element
             * @param name {string} Element REF
             */
            focusElement(name: string) {
                ((this.$refs as any)[name] as HTMLElement)?.focus();
            },
            
            /**
             * Get input string regex
             */
            getStringRegex(type: string): string {
                return PersianHelper.getStringRegex(type);
            },

            /**
             * Just Persian-chars KeyPress Handler
             */
            justPersianKeyPressHandler($event: any): boolean {
                return PersianHelper.justPersianKeyPressHandler($event);
            },

            /**
             * Just English-chars KeyPress Handler
             */
            justEnglishKeyPressHandler($event: any): boolean {
                return PersianHelper.justEnglishKeyPressHandler($event);
            },

            /**
             * Just Number KeyPress Handler
             */
            justNumberKeyPressHandler($event: any): boolean {
                return PersianHelper.justNumberKeyPressHandler($event);
            },
        },
    });
};
