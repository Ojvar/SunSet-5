/**
 * Export config
 */
export const config = (): ServerConfigType => {
    return {
        appName: process.env.APP_NAME || "SUNSET",
        proto: process.env.PROTO || "http",
        serverUrl: process.env.URL || "http://localhost:8085",
        host: process.env.HOST || "localhost",
        port: parseInt(process.env.PORT || "8085"),
        sessionStore: process.env.SESSION_DRIVER || "memory",
        publicPath: process.env.PUBLIC_PATH || "dist",
        basePath:
            process.env.NODE_ENV == "production"
                ? process.env.PUBLIC_PATH || "dist"
                : "",
        ssl: {
            serverCert:
                process.env.SSL_SERVER_CERT || "private/ssl/server-cert.pem",
            serverKey:
                process.env.SSL_SERVER_KEY || "private/ssl/server-key.pem",
        },
        storage: process.env.STORAGE || "storage",
    } as ServerConfigType;
};

/**
 * Express config type
 */
export type ServerConfigType = {
    appName: string;
    proto: string;
    port: number;
    host: string;
    serverUrl: string;
    sessionStore: "redis" | "memory" | null;
    publicPath: string;
    basePath: string;
    ssl: {
        serverCert: string;
        serverKey: string;
    };
    storage: string;
};
