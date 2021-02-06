import IHash from "@Lib/interfaces/hash-interface";

/**
 * E-wallet data type
 */
export type EWalletDataType = {
    wallet_code: string;
    description?: string;
    ballance?: {
        amount: number;
        last_update: string;
    };
    wallet_data?: string;
    is_deleted?: {
        deleted_at?: string;
        deleted_by?: string;
    };
    created_at: string;
    created_by?: string;
    update_history?: [
        {
            updated_at?: string;
            updated_by?: string;
            data?: string;
        }
    ];
};
