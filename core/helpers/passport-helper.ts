import User, { IUserDocument } from "models/user-model";

import { Application } from "express";
import { GlobalMethods } from "./global-methods-helper";
import { GoogleOAuthStrategy } from "../auth-strategies/google-oauth-strategy";
import { LocalLoginStrategy } from "../auth-strategies/local-strategy";
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
            GoogleOAuthStrategy.initGoogleStrategy(config),
            LocalLoginStrategy.initLocalLoginStrategy(),
        ]);

        /* Setup serialization and deserialization */
        Passport.serializeUser((user: any, done: Function) => {
            done(null, user._id || user.id);
        });

        Passport.deserializeUser(async (id: any, done: Function) => {
            try {
                const user: IUserDocument | null = await User.findById(id);

                if (null != user) {
                    done(null, user);
                } else {
                    throw Error("User not found");
                }
            } catch (err) {
                done(err);
            }
        });

        /* Setup passport middlewares */
        app.use(Passport.initialize());
        app.use(Passport.session());
    }
}
