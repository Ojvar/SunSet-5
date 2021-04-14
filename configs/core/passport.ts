import { StrategyOptions } from "passport-google-oauth20";

/**
 * Config
 */
export const config = (): PassportConfigType => {
    return {
        google: {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
            scope: (process.env.GOOGLE_OAUTH_SCOPE || "").split(/[;,\t\ ]/),
        } as StrategyOptions,
    } as PassportConfigType;
};

/**
 * GoogleOAuthConfigType
 */
export type PassportConfigType = {
    google?: StrategyOptions;
};
