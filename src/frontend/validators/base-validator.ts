import IValidator from "@Lib/interfaces/frontend/validators/validator-interface";
import { ActionResultType } from "@Lib/types/frontend/global/action-result-type";
import { ValidatorErrorType } from "@Lib/types/frontend/global/validator-error-type";
import * as ValidatorJs from "validatorjs";

export default class BaseValidator {
  /**
   * Generate error string
   * @param errors Errors lsit
   */
  public generateErrorString(errors: ValidatorJs.ValidationErrors): string {
    const errorValues: Array<any> = Object.values(errors);
    const result = errorValues.map((err) => err.join("\n")).join("\n");

    return result;
  }

  /**
   * Validate data
   */
  public validateData<T>(validator: IValidator, data: any): ActionResultType {
    const result: ActionResultType = {} as ActionResultType;

    /* Preparation */
    const validatorJS: ValidatorJs.Validator<T> = new ValidatorJs(
      data,
      validator.getRules(),
      validator.getMessages(),
    );
    validator.setup<T>(validatorJS);
    validatorJS.setAttributeNames(validator.getAttributes());

    /* Check */
    result.success = true == validatorJS.passes();
    if (!result.success) {
      result.data = {
        validator: validatorJS,
        errors: this.generateErrorString(validatorJS.errors.all()),
      } as ValidatorErrorType;
    }

    return result;
  }
}
