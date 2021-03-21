import { NextFunction, Request, Response } from "express";
import ValidatorJs, {
    AttributeNames,
    ErrorMessages,
    Rules,
    Validator,
} from "validatorjs";

import { ActionResultType } from "@Lib/types/global/action-result-type";
import { ValidatorErrorType } from "@Scripts/validators/base-validator";

/**
 * Base validator
 */
export class BaseValidator {
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
    public validateData<T>(
        validator: BaseValidatorInterface,
        data: any
    ): ActionResultType {
        const result: ActionResultType = {} as ActionResultType;

        /* Preparation */
        const validatorJS: ValidatorJs.Validator<T> = new ValidatorJs(
            data,
            validator.getRules(data),
            validator.getMessages(data)
        );
        validator.setup<T>(validatorJS);
        validatorJS.setAttributeNames(validator.getAttributes(data));

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

    /**
     * Validate middleware
     */
    public static validate<T>(
        dataCollector: (req: Request) => Promise<T> | T,
        validator: BaseValidatorInterface
    ): ValidatorMiddlewareResultType {
        return async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            let documentData: T;

            /* Collect data */
            try {
                documentData = (await dataCollector(req)) as T;
                req.payload = documentData;
            } catch (err) {
                next("Invalid arguments");

                return;
            }

            /* Validate data */
            const validationResult: ActionResultType = validator.validate(
                documentData
            );

            if (!validationResult.success) {
                const error: ValidatorErrorType = validationResult.data as ValidatorErrorType;

                res.status(406)
                    .send({
                        success: false,
                        data: error.errors,
                    } as ActionResultType)
                    .end();

                return;
            }

            next();
        };
    }
}

/**
 * Validator interface
 */
export abstract class BaseValidatorInterface extends BaseValidator {
    /**
     * Post setup method
     * @param validator Validator<T>
     */
    setup<T>(validator: Validator<T>): void {}

    /**
     * Get rules
     * @param data T data
     */
    getRules<T>(data?: T): Rules {
        return {};
    }

    /**
     * Get Attributes
     * @param data T data
     */
    getAttributes<T>(data?: T): AttributeNames {
        return {};
    }

    /**
     * Get Custom messages
     * @param data T data
     */
    getMessages<T>(data?: T): ErrorMessages {
        return {};
    }

    /**
     * Validate
     * @param data T data
     */
    abstract validate(data: any): ActionResultType;
}

/**
 * Validator Middleware Result Type
 */
export type ValidatorMiddlewareResultType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;
