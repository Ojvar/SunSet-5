import {
    Strategy as GoogleStrategy,
    StrategyOptions,
} from "passport-google-oauth20";
import Passport, { Profile } from "passport";
import User, { IUserDocument } from "models/user-model";

import { PassportConfigType } from "@CONFIGS/core/passport";

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

        new GoogleOAuthStrategy().setup(config);
    }

    /**
     * setup
     * @param config {PassportConfigType} Passport config object
     */
    public async setup(config: PassportConfigType) {
        if (!config.google?.clientID) {
            return;
        }

        const configG: StrategyOptions = config.google;

        /* Setup serialization and deserialization */
        Passport.serializeUser((user: any, done: Function) => {
            done(null, user.id);
        });

        Passport.deserializeUser(async (id: any, done: Function) => {
            const user: IUserDocument | null = await User.findById(id);

            if (user) {
                done(null, user);
            }
        });

        Passport.use(new GoogleStrategy(configG, this.googleOAuthCallback));
    }

    /**
     * googleOAuthCallback
     * @param accessToken
     * @param refreshToken
     * @param profile
     * @param done
     */
    public async googleOAuthCallback(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function
    ) {
        let currentUser: IUserDocument | null = await User.findOne({
            "profile.google.id": profile.id,
        });

        /* If user not registered yet */
        if (!currentUser) {
            currentUser = await User.registerByGoogleProfile(profile);
        }

        done(null, currentUser);
    }
}
