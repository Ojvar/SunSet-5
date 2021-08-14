import { ValidatorErrorType } from "@APP/validators/base-validator";
import { ActionResultType } from "@Lib/types/global/action-result-type";
import { AxiosHelper, AxiosResponse } from "@Scripts/helpers/axios-helper";
import { PageHelper } from "@Scripts/helpers/page-helper";
import { getRoute } from "@Scripts/helpers/route-helper";
import { LoginFormValidator } from "@Scripts/validators/auth/login-from-validator";
import { Vuex } from "@Scripts/vendors/vue";

/**
 * Login store
 */
export function LoginStore() {
    return new Vuex.Store({
        state: {
            userLoginData: {
                email: "",
                pwd: "",
            } as UserLoginDataType,
        },

        getters: {
            /**
             * User login data
             * @param state {any} State data
             * @returns {UserLoginDataType}
             */
            userLoginData(state): UserLoginDataType {
                return state.userLoginData;
            },
        },

        mutations: {
            /**
             * Set user login data
             * @param state {any} State object
             * @param data {UserLoginDataType} New user login data
             */
            setUserData(state: any, data: UserLoginDataType) {
                state.userLoginData = data;
            },
        },

        actions: {
            /**
             * Validate login data
             */
            validateLoginData(context: any, data: any): ActionResultType {
                return new LoginFormValidator().validate(
                    context.getters.userLoginData,
                );
            },

            /**
             * Login by google
             */
            async loginByGoogle() {
                PageHelper.redirect(getRoute("auth.google"));
            },

            /**
             * Attempt to login
             * @param context {any} Context object
             * @returns {ActionResultType}
             */
            async attemptToLogin(context: any): Promise<ActionResultType> {
                /* Validate user login data */
                const validationResult: ActionResultType = await context.dispatch(
                    "validateLoginData",
                );

                if (!validationResult.success) {
                    const errorData: ValidatorErrorType = validationResult.data;

                    return {
                        success: false,
                        data: errorData.errors,
                    };
                }

                /* Try to login */
                let data: ActionResultType;

                try {
                    const url: string = getRoute("auth.attempt-to-login");
                    const result: AxiosResponse = await AxiosHelper.post(
                        url,
                        context.getters.userLoginData,
                    );
                    data = result.data;
                } catch (err) {
                    data = {
                        success: false,
                        data: "Server request failed",
                    };
                }

                return data;
            },

            /**
             * Init store
             * @param context {any} Context object
             */
            async init(context: any) {
                context.commit("setUserData", {
                    email: "",
                    pwd: "",
                } as UserLoginDataType);
            },
        },
    });
}

/**
 * User data type
 */
export type UserLoginDataType = {
    email: string;
    pwd: string;
};
