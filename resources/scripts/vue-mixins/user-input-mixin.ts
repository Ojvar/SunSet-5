import { PersianHelper } from "@Scripts/helpers/persian-helper";

/**
 * UserInput mixin
 */
export const UserInputMixin = () => ({
    methods: {
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
