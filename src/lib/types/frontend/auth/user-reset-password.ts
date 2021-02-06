/**
 * User login data type
 */
export type UserResetPasswordType = {
    token: string;
    activationCode: string;
    newPassword: string;
};
