/**
 * Action result type
 */
export type ActionResultType<T = any> = {
    success: boolean;
    data?: T;
};
