import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { UserLoginOtpType } from "@Lib/types/frontend/auth/user-login-otp-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLoginOtp
 */
export default class UserRequestOptTokenValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            nationalId: "required|size:10",
            phoneNumber: "required|size:11",
        } as Rules;
    }

    /**
     * Get error mesages
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {
            required: "فیلد :attribute می بایست تکمیل شود",
            size: "مقدار فیلد :attribute می بایست :size کاراکتر باشد",
            regex: "مقدار فیلد :attribute می بایست فقط عدد باشد",
        } as ErrorMessages;
    }

    /**
     * Setup attribute names
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
            nationalId: "کد ملی",
            phoneNumber: "شماره تلفن همراه",
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
    public validate(data: UserLoginOtpType): ActionResultType {
        return super.validateData<UserLoginOtpType>(this, data);
    }
}
