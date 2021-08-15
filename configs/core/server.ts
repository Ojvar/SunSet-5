export const C_1_HOUR: string = (1 * 60 * 60 * 1000).toString();

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

        express: {
            urlencoded: {
                limit: process.env.EXPRESS_URL_ENCODE_LIMIT || "2mb",
            },
            json: {
                limit: process.env.EXPRESS_JSON_LIMIT || "2mb",
            },
        },

        session: {
            cookie: {
                secure: process.env.SESSION_SECURE
                    ? process.env.SESSION_SECURE.toLowerCase() == "true"
                    : ("" + process.env.PROTO).toLowerCase() == "https",
                maxAge: +(process.env.SESSION_MAX_AGE || C_1_HOUR),
            },
        },
    } as ServerConfigType;
};

/**
 * Express config type
 */
export type ServerConfigType = {
    appName: string;
    basePath: string;
    host: string;
    port: number;
    proto: string;
    publicPath: string;
    serverUrl: string;
    sessionStore: "redis" | "memory" | null;
    storage: string;
    express: {
        urlencoded: any;
        json: any;
    };
    ssl: {
        serverCert: string;
        serverKey: string;
    };
    session: {
        cookie: {
            secure: boolean;
            maxAge: number;
        };
    };
};
