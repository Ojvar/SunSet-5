/**
 * Export config
 */
export const config = {
    proto: process.env.PROTO || "http",
    serverUrl: process.env.URL || "http://localhost:8085",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || "8585"),
} as ExpressConfigType;

/**
 * Express config type
 */
export type ExpressConfigType = {
    proto: string;
    port: number;
    host: string;
    serverUrl: string;
};
