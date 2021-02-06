import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLogin
 */
export default class UserphoneNumberValidator extends BaseValidator
    implements IValidator {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
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
      regex:
        "مقدار فیلد :attribute می بایست فقط عدد باشد و با 09 شروع شود",
    } as ErrorMessages;
  }

    /**
     * Setup attribute names
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
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
    public validate(data: string): ActionResultType {
        return super.validateData<string>(this, data);
    }
}
