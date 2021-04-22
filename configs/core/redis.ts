import { ClientOpts } from "redis";

/**
 * Export config
 */
export const config = (): ClientOpts => {
    return {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        db: parseInt(process.env.REDIS_DB || "0"),
        auth_pass: process.env.REDIS_AUTH,
        password: process.env.REDIS_AUTH,
    };
};

/* 
      NOTES
            Options
                host?: string;
                port?: number;
                path?: string;
                url?: string;
                parser?: string;
                string_numbers?: boolean;
                return_buffers?: boolean;
                detect_buffers?: boolean;
                socket_keepalive?: boolean;
                socket_initial_delay?: number;
                no_ready_check?: boolean;
                enable_offline_queue?: boolean;
                retry_max_delay?: number;
                connect_timeout?: number;
                max_attempts?: number;
                retry_unfulfilled_commands?: boolean;
                auth_pass?: string;
                password?: string;
                db?: string | number;
                family?: string;
                disable_resubscribing?: boolean;
                rename_commands?: { [command: string]: string } | null;
                tls?: any;
                prefix?: string;
                retry_strategy?: RetryStrategy;
*/
