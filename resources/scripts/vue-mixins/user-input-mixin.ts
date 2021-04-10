import { PersianHelper } from "@Scripts/helpers/persian-helper";
import { Vue } from "@Scripts/vendors/vue";

/**
 * UserInput mixin
 */
export const UserInputMixin = () => {
    return Vue.extend({
        methods: {
            /**
             * Get input string regex
             * @param type {string}
             */
            getStringRegex(type: string): string {
                return PersianHelper.getStringRegex(type);
            },

            /**
             * Just Persian-chars KeyPress Handler
             * @param event {any}
             */
            justPersianKeyPressHandler(event: any): boolean {
                return PersianHelper.justPersianKeyPressHandler(event);
            },

            /**
             * Just English-chars KeyPress Handler
             * @param event {any}
             */
            justEnglishKeyPressHandler(event: any): boolean {
                return PersianHelper.justEnglishKeyPressHandler(event);
            },

            /**
             * Just Number KeyPress Handler
             * @param event {any}
             */
            justNumberKeyPressHandler(event: any): boolean {
                return PersianHelper.justNumberKeyPressHandler(event);
            },
        },
    });
};
