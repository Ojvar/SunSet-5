import { Application } from "express";
import { GlobalMethods } from "./global-methods-helper";
import { GoogleOAuthStrategy } from "./auth-strategies/google-oauth-strategy";
import { LocalLoginStrategy } from "./auth-strategies/local-strategy";
import Passport from "passport";
import { PassportConfigType } from "@CONFIGS/core/passport";

/**
 * PassportHelper class
 */
export class PassportHelper {
    /**
     * Initialize
     */
    public async init(app: Application) {
        const config: PassportConfigType = (
            await GlobalMethods.importFile("./configs/core/passport")
        ).config;

        /* Setup all available strategies */
        await Promise.all([
            await GoogleOAuthStrategy.initGoogleStrategy(config),
            await LocalLoginStrategy.initLocalLoginStrategy(),
        ]);

        /* Setup passport middlewares */
        app.use(Passport.initialize());
        app.use(Passport.session());
    }
}
