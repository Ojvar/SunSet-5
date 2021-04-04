import { Hash } from "@Lib/types/hash-type";

/**
 * Convert numbers Type
 */
export enum NumberConvertEnum {
    PERSIAN = "fa",
    ENGLISH = "en",
}

/**
 * Perian fix class
 */
export class PersianHelper {
    /**
     * Numbers object
     */
    public static numbers: Hash<Array<string>> = {
        fa: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
        en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    };

    /**
     * Convert digits
     * @param input string INput string
     * @param sourceType NumberConvertEnum Target type
     * @param tragetType NumberConvertEnum Target type
     */
    public static convertDigits(
        input: string,
        sourceType: NumberConvertEnum,
        trageType: NumberConvertEnum
    ): string {
        if (!input) {
            return input;
        }

        const sourceLang: Array<string> = this.numbers[sourceType];
        const targetLang: Array<string> = this.numbers[trageType];

        for (let i = 0; i < sourceLang.length; i++) {
            input = input.replace(
                new RegExp(sourceLang[i], "g"),
                targetLang[i]
            );
        }

        return input;
    }

    /**
     * Convert arabic to persian
     * @param input string Input string
     */
    public static convertArabicToPersian(input: string) {
        let result = input.replace(/ك/g, "ک").replace(/ي/g, "ی");

        return result;
    }

    /**
     * Fix All Fields
     * @param obj any Object
     * @param source Source lang
     * @param target Target lang
     */
    public static fixAllFields(
        obj: any,
        source: NumberConvertEnum,
        target: NumberConvertEnum,
        makeClone: boolean = false
    ) {
        let result: any = obj;

        if (makeClone) {
            result = { ...result };
        }

        Object.keys(result).forEach((key) => {
            result[key] = PersianHelper.convertDigits(
                result[key],
                source,
                target
            );
            result[key] = PersianHelper.convertArabicToPersian(result[key]);
        });

        return result;
    }

    /**
     * Get input string regex
     */
    public static getStringRegex(type: string): string {
        switch (type) {
            case "farsi":
                return `^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u0020\u2000-\u200F\u2028-\u202F\u06A9\u06AF\u06BE\u06CC\u0629\u0643\u0649-\u064B\u064D\u06D5\s]+$`;

            case "english":
                return "[A-Z a-z]*";

            case "number":
                return "[0-9\u06F0-\u06F9]*";
        }

        return "";
    }

    /**
     * Just persian letter
     */
    public static justPersianKeyPressHandler(e: any): boolean {
        let char = String.fromCharCode(e.keyCode);
        let regex: RegExp = new RegExp(this.getStringRegex("farsi"));

        if (regex.test(char)) {
            return true;
        } else {
            e.preventDefault();
        }

        return false;
    }

    /**
     * Just english letter
     */
    public static justEnglishKeyPressHandler(e: any): boolean {
        let char = String.fromCharCode(e.keyCode);
        let regex: RegExp = new RegExp(this.getStringRegex("english"));

        if (regex.test(char)) {
            return true;
        } else {
            e.preventDefault();
        }

        return false;
    }

    /**
     * Just english letter
     */
    public static justNumberKeyPressHandler(e: any): boolean {
        let char = String.fromCharCode(e.keyCode);
        let regex: RegExp = new RegExp(this.getStringRegex("number"));

        if (regex.test(char)) {
            return true;
        } else {
            e.preventDefault();
        }

        return false;
    }
}
