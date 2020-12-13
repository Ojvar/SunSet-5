import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { UserLoginType } from "@Lib/types/frontend/auth/user-login-type";
import { ActionResultType } from "@Lib/types/frontend/global/action-result-type";
import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import BaseValidator from "../base-validator";

/**
 * Validator of UserLogin
 */
export default class LoginDataValidator extends BaseValidator
  implements IValidator {
  /**
   * Get rules
   */
  public getRules<T>(data?: T): Rules {
    return {
      nationalId: "required|size:10",
      password: "required|min:6|max:50",
    } as Rules;
  }

  /**
   * Get error mesages
   */
  public getMessages<T>(data?: T): ErrorMessages {
    return {
      required: "Field :attribute should has a value",
    } as ErrorMessages;
  }

  /**
   * Setup attribute names
   */
  public getAttributes<T>(data?: T): AttributeNames {
    return {
      nationalId: "Nationa ID",
      password: "Password",
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
  public validate(data: UserLoginType): ActionResultType {
    return super.validateData<UserLoginType>(this, data);
  }
}
