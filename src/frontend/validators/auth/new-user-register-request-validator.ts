import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { UserRegisterType } from "@Lib/types/frontend/auth/user-register-type";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of User Register
 */
export default class NewUserRegisterRequestValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            firstName: "required|min:3",
            lastName: "required|min:3",
            nationalId: "required|size:10",
            phoneNumber: "required|size:11",
        } as Rules;
    }

    /**
     * Get error mesages
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {
            required: "مقدار :attribute را وارد نمایید",
            size: "مقدار کاراکتر وارد شده برای :attribute مجاز نمی باشد",
            min:
                "مقدار وارد شده برای :attribute می بایست حداقل :min کاراکتر باشد",
            regex: "مقدار فیلد :attribute می بایست فقط عدد باشد",
        } as ErrorMessages;
    }

    /**
     * Setup attribute names
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
            firstName: "نام",
            lastName: "نام خانوادگی",
            nationalId: "کد ملی",
            phoneNumber: "تلفن همراه",
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
    public validate(data: UserRegisterType): ActionResultType {
        return super.validateData<UserRegisterType>(this, data);
    }
}
