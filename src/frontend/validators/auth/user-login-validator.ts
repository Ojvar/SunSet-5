import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { UserLoginDataType } from "@Lib/types/frontend/auth/user-login-data-type";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLogin
 */
export default class UserLoginValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            nationalId: "required|size:10",
            password: "required|min:8|max:50",
        } as Rules;
    }

    /**
     * Get error mesages
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {
            required: "فیلد :attribute می بایست تکمیل شود",
            size: "مقدار فیلد :attribute می بایست :size کاراکتر باشد",
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
            nationalId: "کد ملی",
            password: "گذر واژه",
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
    public validate(data: UserLoginDataType): ActionResultType {
        return super.validateData<UserLoginDataType>(this, data);
    }
}
