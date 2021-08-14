import { BASE_URL } from "@CONFIGS/frontend/server";
import { applyArguments } from "@CORE/helpers/route-helper";
import { Hash } from "@Lib/types/hash-type";

/**
 * Export routes
 */
export const routes: Hash<string> = {
    /* GET */
    "accounts.accounts": "accounts/accounts",
    "accounts.load-exchange-list": "accounts/loadExchangeList",
    "auth.google": "auth/google",
    "auth.login": "auth/login",
    "auth.logout": "auth/logout",

    /* POST */
    "accounts.reg-exchange-accounte": "accounts/regExchangeAccounte",
    "auth.attempt-to-login": "auth/login",
    "auth.new-user-Activation-code": "auth/newUserActivationCode",
    "auth.register-new-user": "auth/registerNewUser",
    "auth.resend-new-user-Activation-code": "auth/resendNewUserActivationCode",
    "auth.resend-reset-pwd-Activation-code":
        "auth/resendResetPwdActivationCode",
    "auth.reset-password": "auth/resetPassword",
    "auth.reset-pwd-activation-code": "auth/resetPwdActivationCode",
};

/**
 * Get route with applied args
 * @param routeName {string} Route name
 * @param args {any} Arguments
 * @param queryString {any} Arguments
 */
export function getRoute(
    routeName: string,
    args: any = {},
    queryString: any = {},
): string {
    let route = routes[routeName]
        ? `${BASE_URL}/${routes[routeName]}`
        : routeName;

    return applyArguments(route, args, queryString);
}
