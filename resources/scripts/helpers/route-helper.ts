import { Hash } from "@Lib/types/hash-type";
import { applyArguments } from "@CORE/helpers/route-helper";

const BASE_ROUTE = `http://localhost:8085`;

/**
 * Export routes
 */
export const routes: Hash<string> = {
    /* GET */
    "auth.login": `${BASE_ROUTE}/auth/login`,
    "auth.logout": `${BASE_ROUTE}/auth/logout`,
    "auth.google": `${BASE_ROUTE}/auth/google`,

    /* POST */
    "auth.attempt-to-login": `${BASE_ROUTE}/auth/login`,
};

/**
 * Get route with applied args
 * @param route {string} Route name
 * @param args {any} Arguments
 */
export function getRoute(route: string, args: any = {}) {
    return applyArguments(routes[route] || route, args);
}
