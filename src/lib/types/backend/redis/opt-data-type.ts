/**
 * Redis otp data type
 */
export type OtpDataType = {
    token: string;
    activationCode: string;
    registered_at: Date;
    userId: string;
};
