/**
 * User login OTP data type
 */
export type UserLoginOtpType = {
    nationalId: string;
    phoneNumber: string;
    captcha?: string;
};
