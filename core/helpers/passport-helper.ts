import {
    config as PassportConfig,
    PassportConfigType,
} from "@CONFIGS/core/passport";
import { GoogleOAuthStrategy } from "@CORE/auth-strategies/google-oauth-strategy";
import { LocalLoginStrategy } from "@CORE/auth-strategies/local-strategy";
import User, { IUserDocument } from "@MODELS/user-model";
import { Application } from "express";
import Passport from "passport";

/**
 * PassportHelper class
 */
export class PassportHelper {
    /**
     * Initialize
     */
    public async init(app: Application) {
        const config: PassportConfigType = PassportConfig();

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
                    done("User not found");
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
