import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { OtpResponseType } from "@Lib/types/frontend/auth/opt-response-type";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLoginOtp
 */
export default class UserLoginDataOtpValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            token: "required",
            activationCode: "required",
        } as Rules;
    }

    /**
     * Get error mesages
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {
            required: "فیلد :attribute می بایست تکمیل شود",
            regex: "مقدار فیلد :attribute می بایست فقط عدد باشد",
        } as ErrorMessages;
    }

    /**
     * Setup attribute names
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
            activationCode: "کد تایید",
            token: "کد فعال سازی",
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
    public validate(data: OtpResponseType): ActionResultType {
        return super.validateData<OtpResponseType>(this, data);
    }
}
