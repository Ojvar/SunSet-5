/**
 * ExpressConfigType Config Type
 */
export type ExpressConfigType = {
    publicPath: string;

    host: string;
    port: number;
    url: string;
    protocol: string;

    trustedProxy: string;

    throttleStore: string;
    throttleWindow: number;
    throttleMax: number;
    throttleDelay: number;

    useMulter: boolean;

    bodyParser: {
        limit: string;
    };

    sslServerKey: string;
    sslServerCert: string;
};
