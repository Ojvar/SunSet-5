import { SessionOptions } from "express-session";

/**
 * Session Config Type
 */
export type SessionConfigType = {
    store: string;
    options: SessionOptions;
};
