import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { UserResetPasswordType } from "@Lib/types/frontend/auth/user-reset-password";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLogin
 */
export default class UserResetPasswordValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            token: "required",
            activationCode: "required",
            newPassword: "required|min:8|max:50",
        } as Rules;
    }

    /**
     * Get error mesages
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {
            required: "فیلد :attribute می بایست تکمیل شود",
            min: "مقدار فیلد :attribute می بایست حداقل :min کاراکتر باشد",
            max: "مقدار فیلد :attribute می بایست حداکثر :max کاراکتر باشد",
            regex:
                "مقدار فیلد :attribute می بایست ترکیبی از عدد و حروف انگلیسی باشد",
        } as ErrorMessages;
    }

    /**
     * Setup attribute names
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
            token: "کد تایید",
            activationCode: "کد فعال سازی",
            newPassword: "گذر واژه",
        } as AttributeNames;
    }

    /**
     * Setup Validator
     */
    public setup<T>(validator: Validator<T>): void {
        validator.lang = "en";
    }

    /**
     * Validate data
     * @param data Input data
     */
    public validate(data: UserResetPasswordType): ActionResultType {
        return super.validateData<UserResetPasswordType>(this, data);
    }
}
