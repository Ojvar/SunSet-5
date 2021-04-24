import { applyArguments } from "@CORE/helpers/route-helper";
import { Hash } from "@Lib/types/hash-type";

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
export function getRoute(route: string, args: any = {}): string {
    return applyArguments(routes[route] || route, args);
}
