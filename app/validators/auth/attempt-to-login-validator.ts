import {
    BaseValidatorInterface,
    validate,
    ValidatorMiddlewareResultType,
} from "@APP/validators/base-validator";
import {
    EMailRule,
    MaxRule,
    MinRule,
    RequiredRule,
} from "@APP/validators/validation-rules";
import { ActionResultType } from "@Lib/types/global/action-result-type";
import { AttempToLoginType } from "@TYPES/backend/auth-types";
import { Request } from "express";
import { AttributeNames, Rules } from "validatorjs";

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
     * Get attributes
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
    public validate(
        data: AttempToLoginType,
        asyncCall: boolean = false
    ): ActionResultType | Promise<ActionResultType> {
        try {
            const userData: AttempToLoginType = JSON.parse(
                JSON.stringify(data)
            );

            return super.validateData<AttempToLoginType>(this, userData);
        } catch (err) {
            return {
                data: err,
                success: false,
            };
        }
    }

    /**
     * Validate middleware
     */
    public static validate(): ValidatorMiddlewareResultType {
        return validate<AttempToLoginType>(
            (req: Request): AttempToLoginType =>
                ({
                    email: req.body.email,
                    pwd: req.body.pwd,
                } as AttempToLoginType),
            new AttempToLoginValidator()
        );
    }
}
