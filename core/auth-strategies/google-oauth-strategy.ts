import { PassportConfigType } from "@CONFIGS/core/passport";
import User, { IUserDocument } from "@MODELS/user-model";
import passport from "passport";
import {
    Strategy as GoogleStrategy,
    StrategyOptions,
} from "passport-google-oauth20";

/**
 * Google OAuth Strategy
 */
export class GoogleOAuthStrategy {
    /**
     * initGoogleStrategy
     * @param config {PassportConfigType} Passport config object
     */
    public static async initGoogleStrategy(config: PassportConfigType) {
        if (!config.google?.clientID) {
            return;
        }

        await new GoogleOAuthStrategy().setup(config);
    }

    /**
     * setup
     * @param config {PassportConfigType} Passport config object
     */
    public async setup(config: PassportConfigType) {
        const configG: StrategyOptions =
            config.google || ({} as StrategyOptions);
        passport.use(new GoogleStrategy(configG, this.googleOAuthCallback));
    }

    /**
     * googleOAuthCallback
     * @param accessToken
     * @param refreshToken
     * @param profile
     * @param done
     */
    private async googleOAuthCallback(
        accessToken: string,
        refreshToken: string,
        profile: passport.Profile,
        done: Function,
    ) {
        try {
            let currentUser: IUserDocument | null = await User.findOne({
                "profile.google.id": profile.id,
            });

            /* If user not registered yet */
            if (!currentUser) {
                currentUser = await User.registerByGoogleProfile(profile);
            }

            done(null, currentUser);
        } catch (err) {
            done(err);
        }
    }
}
