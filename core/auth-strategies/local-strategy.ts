import userModel, { IUserDocument } from "@MODELS/user-model";
import Passport from "passport";
import { Strategy } from "passport-local";

/**
 * Local Login Strategy
 */
export class LocalLoginStrategy {
    /**
     * Init local login strategy
     */
    public static async initLocalLoginStrategy() {
        new LocalLoginStrategy().setup();
    }

    /**
     * Setup
     */
    public async setup() {
        Passport.use(
            new Strategy(
                {
                    usernameField: "email",
                    passwordField: "pwd",
                    session: true,
                },
                this.authenticationFunc
            )
        );
    }

    /**
     * Check username/password
     * @param username {string} Username
     * @param password {string} Password
     * @param done {Function} Done function
     */
    private async authenticationFunc(
        username: string,
        password: string,
        done: Function
    ) {
        try {
            const user: IUserDocument | null = await userModel.findOne({
                email: username.toLowerCase(),
                pwd: password,
            });

            if (null == user) {
                done(null, false);
            } else {
                done(null, user);
            }
        } catch (err) {
            done(err);
        }
    }
}
