/**
 * Export config
 */
export const config = {
    proto: process.env.PROTO || "http",
    serverUrl: process.env.URL || "http://localhost:8085",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || "8585"),
    sessionStore: process.env.SESSION_DRIVER || "memory",
    publicPath: process.env.PUBLIC_PATH || "dist",
    basePath:
        process.env.NODE_ENV == "production"
            ? process.env.PUBLIC_PATH || "dist"
            : "",
} as ServerConfigType;

/**
 * Express config type
 */
export type ServerConfigType = {
    proto: string;
    port: number;
    host: string;
    serverUrl: string;
    sessionStore: "redis" | "memory" | null;
    publicPath: string;
    basePath: string;
};
