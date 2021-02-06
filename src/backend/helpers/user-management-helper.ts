import { AxiosResponse } from "axios";
import AxiosModule from "@FE/Scripts/modules/axios-module";
import { ActionResultType } from "@Lib/types/core/action-result-type";
import { UserLoginDataType } from "@Lib/types/frontend/auth/user-login-data-type";
import { UserLoginOtpType } from "@Lib/types/frontend/auth/user-login-otp-type";
import { OtpResponseType } from "@Lib/types/frontend/auth/opt-response-type";
import { UserResetPasswordType } from "@Lib/types/frontend/auth/user-reset-password";
import { UserRegisterType } from "@Lib/types/frontend/auth/user-register-type";
import { OtpPrefixEnum } from "@Lib/enums/backend/opt-prefix-enum";
import { NationalIDType } from "@Lib/validation/national-id-type";
import { Routes } from "@BE/helpers/service-route-helper";

/**
 * UserManagement Helper class
 */
export default class UserManagementHelper {
    /**
     * Login by user data
     */
    public static async loginByUserData(
        userData: UserLoginDataType
    ): Promise<ActionResultType> {
        /* TODO: Validaion */
        const url = Routes["auth.login-by-user-data"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            userData
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Request OTP token
     */
    public static async requestOtpToken(
        requestData: UserLoginOtpType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        /* Validaion / TODO */
        const url = Routes["auth.request-otp-token"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            requestData
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     *
     * @param otpResponse OtpResponseType OTP Response data
     */
    public static async loginByOtpToken(
        otpResponse: OtpResponseType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        const url = Routes["auth.login-by-otp-token"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            otpResponse
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Reset user password
     * @param otpResponse OtpResponseType OTP Response data
     */
    public static async requestForgetPasswordToken(
        otpResponse: UserLoginOtpType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        const url = Routes["auth.request-forget-password-token"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            otpResponse
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }
    /**
     * Check user activation code reset password
     */
    public static async checkUserActivationCodeResetPassword(
        activationCodeData: OtpResponseType,
        optPerfix: string
    ): Promise<ActionResultType> {
        const url = Routes["auth.check-user-activation-code-rseset-password"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            activationCodeData
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Reset user password
     * @param otpResponse OtpResponseType OTP Response data
     */
    public static async resetPassword(
        otpResponse: UserResetPasswordType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        const url = Routes["auth.reset-password"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            otpResponse
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Request OTP token register
     */
    public static async requestOtpTokenRegister(
        newUserData: UserRegisterType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        /* Validaion / TODO */
        const url = Routes["auth.request-otp-token-register"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            newUserData
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Confirm new user register
     */
    public static async confirmNewUserRegister(
        otpResponse: OtpResponseType,
        otpPerfix: OtpPrefixEnum = OtpPrefixEnum.NONE
    ): Promise<ActionResultType> {
        const url = Routes["auth.confirm-new-user-register"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            otpResponse
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Check user national id
     */
    public static async checkUserNationalId(
        nationalId: NationalIDType
    ): Promise<ActionResultType> {
        /* Validaion / TODO */
        const url = Routes["auth.check-user-national-id"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            nationalId
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }

    /**
     * Check user phone number
     */
    public static async checkUserPhoneNumber(
        phoneNumber: string
    ): Promise<ActionResultType> {
        /* Validaion / TODO */

        const url = Routes["auth.check-user-phone-number"];
        const axiosResult: AxiosResponse = await AxiosModule.post(
            url,
            phoneNumber
        );

        let result: ActionResultType = axiosResult.data as ActionResultType;

        return result;
    }
}
