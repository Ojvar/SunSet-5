export const BASE_ROUTE = `http://localhost:8085`;

/**
 * Export routes
 */
export const routes = {
    /* GET */
    "auth.login": `${BASE_ROUTE}/auth/login`,
    "auth.logout": `${BASE_ROUTE}/auth/logout`,

    /* POST */
    "auth.attempt-to-login": `${BASE_ROUTE}/auth/login`,
};
