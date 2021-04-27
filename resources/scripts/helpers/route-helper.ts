import { applyArguments } from "@CORE/helpers/route-helper";
import { Hash } from "@Lib/types/hash-type";

/**
 * Export routes
 */
export const routes: Hash<string> = {
    /* GET */
    "auth.login": "auth/login",
    "auth.logout": "auth/logout",
    "auth.google": "auth/google",

    /* POST */
    "auth.attempt-to-login": "auth/login",
};

/**
 * Get route with applied args
 * @param routeName {string} Route name
 * @param args {any} Arguments
 */
export function getRoute(routeName: string, args: any = {}): string {
    let route = routes[routeName]
        ? `http://localhost:8085/${routes[routeName]}`
        : routeName;

    return applyArguments(route, args);
}
