import { AxiosHelper, AxiosResponse } from "@Scripts/helpers/axios-helepr";
import { Store, StoreOptions, Vuex } from "@Scripts/vendors/vue";

import { ActionResultType } from "@Lib/types/global/action-result-type";
import { PageHelper } from "@Scripts/helpers/page-helper";
import { routes } from "@Scripts/helpers/route-helper";

/**
 * ILoginStore
 */
export interface ILoginStore extends StoreOptions {
    state: UserLoginDataType;

    getters: {
        userLoginData(state);
    };

    actions: {
        loginByGoogle(context: any): Promise<void>;
        attemptToLogin(context: any): Promise<ActionResultType>;
        init(context: any): Promise<void>;
    };

    mutations?: {};
}

/**
 * Login store type
 */
export type LoginStoreType = Store<ILoginStore>;

/**
 * Login store
 */
export function LoginStore(): LoginStoreType {
    return new Vuex.Store<ILoginStore>({
        state: {
            userLoginData: {
                email: "",
                pwd: "",
            } as UserLoginDataType,
        },

        getters: {
            /**
             *
             * @param state {any} State data
             * @returns {UserLoginDataType}
             */
            userLoginData(state) {
                return state.userLoginData;
            },
        },

        actions: {
            /**
             * Login by google
             */
            async loginByGoogle() {
                PageHelper.redirect(routes["auth.google"]);
            },

            /**
             * Attempt to login
             * @param context {any} Context object
             * @returns {ActionResultType}
             */
            async attemptToLogin(context: any): Promise<ActionResultType> {
                let data: ActionResultType;

                try {
                    const url: string = routes["auth.attempt-to-login"];
                    const result: AxiosResponse = await AxiosHelper.post(
                        url,
                        context.getters.userLoginData
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
