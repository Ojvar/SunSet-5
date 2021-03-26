/**
 * Config
 */
export const config = {
    driver: process.env.DB_DRIVER || "none",
    mongoose: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,

        connection: {
            dbHost: process.env.DB_HOST || "127.0.0.1",
            dbName: process.env.DB_NAME || "sunset_db",
            dbPassword: process.env.DB_PASSWORD,
            dbPort: parseInt(process.env.DB_PORT || "27017"),
            dbUser: process.env.DB_USER,
        },
    },
} as DatabaseConfigType;

/**
 * GoogleOAuthConfigType
 */
export type DatabaseConfigType = {
    driver: DatabaseDriverType;
    mongoose?: {
        connection?: {
            dbHost: string;
            dbName: string;
            dbPassword?: string;
            dbPort: number;
            dbUser?: string;
        };
    };
};

/**
 * Database driver type
 */
export type DatabaseDriverType = "none" | "mongodb";
