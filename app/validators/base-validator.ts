import { ActionResultType } from "@Lib/types/global/action-result-type";
import { NextFunction, Request, Response } from "express";
import ValidatorJs, {
    AttributeNames,
    ErrorMessages,
    Rules,
    Validator,
} from "validatorjs";

/**
 * Base validator
 */
export class BaseValidator {
    /**
     * Generate error string
     * @param errors Errors list
     */
    public generateErrorString(errors: ValidatorJs.ValidationErrors): string {
        const errorValues: Array<any> = Object.values(errors);

        return errorValues.map((err) => err.join("\n")).join("\n");
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

        /* Check async */
        result.success = validatorJS.check();

        /* Setup result */
        if (!result.success) {
            result.data = {
                validator: validatorJS,
                errors: this.generateErrorString(validatorJS.errors.all()),
            } as ValidatorErrorType;
        }

        return result;
    }

    /**
     * Validate data async
     */
    public validateDataAsync<T>(
        validator: BaseValidatorInterface,
        data: any
    ): Promise<ActionResultType> {
        return new Promise((resolve: Function, reject: Function) => {
            const result: ActionResultType = {} as ActionResultType;

            /* Preparation */
            const validatorJS: ValidatorJs.Validator<T> = new ValidatorJs(
                data,
                validator.getRules(data),
                validator.getMessages(data)
            );
            validator.setup<T>(validatorJS);
            validatorJS.setAttributeNames(validator.getAttributes(data));

            /* Setup resultFunctionO func */
            const resultFunction = (): void => {
                if (!result.success) {
                    result.data = {
                        validator: validatorJS,
                        errors: this.generateErrorString(
                            validatorJS.errors.all()
                        ),
                    } as ValidatorErrorType;
                }

                resolve(result);
            };

            /* Check async */
            validatorJS.checkAsync(
                () => {
                    result.success = true;
                    resultFunction();
                },
                () => {
                    result.success = false;
                    resultFunction();
                }
            );
        });
    }
}

/**
 * Validation middleware
 * @param dataCollector {(req: Request) => Promise<T> | T} Data collector function
 * @param validator {BaseValidatorInterface}
 * @returns {ValidatorMiddlewareResultType}
 */
export function validate<T>(
    dataCollector: (req: Request) => Promise<T> | T,
    validator: BaseValidatorInterface,
    asyncValidation: boolean = false
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
        const validationResult: ActionResultType = await validator.validate(
            documentData,
            asyncValidation
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

/**
 * Abstract Validator class
 */
export abstract class BaseValidatorInterface extends BaseValidator {
    /**
     * Post setup method
     * @param validator Validator<T>
     */
    public setup<T>(validator: Validator<T>): void {}

    /**
     * Get rules
     * @param data T data
     */
    public getRules<T>(data?: T): Rules {
        return {};
    }

    /**
     * Get Attributes
     * @param data T data
     */
    public getAttributes<T>(data?: T): AttributeNames {
        return {};
    }

    /**
     * Get Custom messages
     * @param data T data
     */
    public getMessages<T>(data?: T): ErrorMessages {
        return {};
    }

    /**
     * Validate
     * @param data T data
     */
    abstract validate(
        data: any,
        asyncCall: boolean
    ): ActionResultType | Promise<ActionResultType>;
}

/**
 * Validator Middleware Result Type
 */
export type ValidatorMiddlewareResultType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

/**
 * ValidatorError type
 */
export type ValidatorErrorType = {
    validator: Validator.Validator<any>;
    errors: string;
};
