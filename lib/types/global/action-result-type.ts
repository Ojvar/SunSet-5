/**
 * Action result type
 */
export type ActionResultType<T = any> = {
    data?: T;
    errorCode?: number;
    success: boolean;
};
