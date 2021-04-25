import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";
import { Application } from "express";
import { PassportHelper } from "../../helpers/passport-helper";

/**
 * Default export
 */
export default class PassportMiddleware implements MiddlewareInterface {
    private _expressHelper?: ExpressHelper;
    private passportHelper: PassportHelper = new PassportHelper();

    /**
     * Setup function
     * @param payload {any} Payload data
     */
    async setup(payload?: any): Promise<void> {
        this._expressHelper = payload as ExpressHelper;
    }

    /**
     * Check function
     * @param payload {any} Payload data
     */
    public async check(payload?: any): Promise<void> {
        const app: Application = this._expressHelper?.App as Application;

        await this.passportHelper.init(app);
    }
}
