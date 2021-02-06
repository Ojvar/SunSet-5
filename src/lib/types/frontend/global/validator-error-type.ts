import { Validator } from "validatorjs";

/**
 * ValidatorError type
 */
export type ValidatorErrorType = {
    validator: Validator<any>;
    errors: string;
};
