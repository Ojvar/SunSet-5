import IHash from "@Lib/interfaces/hash-interface";

/**
 * Transaction request type
 */
export type EWalletTransactionType = {
    receipt_code: string;
    e_wallet: string;
    balance: number;
    amount: number;
    description?: string;
    tags?: Array<string>;
    receipt_data?: IHash<string>;
    is_deleted?: {
        deleted_at: string;
        deleted_by: string;
        description: string;
    };
    created_at: string;
    created_by?: string;
};
