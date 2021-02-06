import { AttributeNames, ErrorMessages, Rules, Validator } from "validatorjs";
import { ActionResultType } from "@Lib/types/core/action-result-type";

/**
 * Validator interface
 */
export default interface IValidator {
    /**
     * Post setup method
     * @param validator Validator<T>
     */
    setup<T>(validator: Validator<T>): void;

    /**
     * Get rules
     * @param data T data
     */
    getRules<T>(data?: T): Rules;

    /**
     * Get Attributes
     * @param data T data
     */
    getAttributes<T>(data?: T): AttributeNames;

    /**
     * Get Custom messages
     * @param data T data
     */
    getMessages<T>(data?: T): ErrorMessages;

    /**
     * Validate
     * @param data T data
     */
    validate(data: any): ActionResultType;
}
