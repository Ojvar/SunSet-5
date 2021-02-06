/**
 * Hoda authCallback result type
 */
export type HodaAuthCallbackResultType = {
    status: string;
    error?: string;
    payload?: string;
    payloadData?: {
        authAssertion: string;
        refId: string;
        spReqId: string;
    };
};
