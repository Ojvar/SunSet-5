import { IUserDocument } from "models/user-model";
import Passport from "passport";
import { Strategy } from "passport-local";
import userModel from "@/models/user-model";

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
        Passport.use(new Strategy(this.authenticationFunc));
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
                username,
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
