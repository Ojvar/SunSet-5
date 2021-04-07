import { AttributeNames, Rules } from "validatorjs";

import { ActionResultType } from "@Lib/types/global/action-result-type";
import { AttempToLoginType } from "@APP/controllers/auth-controller";
import { BaseValidatorInterface } from "./../base-validator";
import { RequiredRule } from "../base-validator";

/**
 * Validator class
 */
export class AttempToLoginValidator extends BaseValidatorInterface {
    /**
     * Get rules
     */
    public getRules<T>(data?: T): Rules {
        return {
            email: [RequiredRule, EMailRule],
            pwd: [RequiredRule, MinRule(8), MaxRule(50)],
        } as Rules;
    }

    /**
     *
     * @param data {T} Data type
     * @returns {Object} User-friendly attributes name
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {
            email: "EMail",
            pwd: "Password",
        };
    }

    /**
     * Validate data
     * @param data Input data
     */
    public validate(data: AttempToLoginType): ActionResultType {
        try {
            let userData: AttempToLoginType = JSON.parse(JSON.stringify(data));

            return super.validateData<AttempToLoginType>(this, userData);
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }
}
