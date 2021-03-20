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
     * @param email {string} Username
     * @param pwd {string} Password
     * @param done {Function} Done function
     */
    private async authenticationFunc(
        email: string,
        pwd: string,
        done: Function
    ) {
        try {
            const user: IUserDocument | null = await userModel.findOne({
                email,
                pwd,
            });

            if (null == user) {
                throw Error("User not found");
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
}
