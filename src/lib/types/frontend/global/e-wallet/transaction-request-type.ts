import IHash from "@Lib/interfaces/hash-interface";

/**
 * Transaction request type
 */
export type TransactionRequestType = {
    transactionId?: string;
    ewalletId: string;
    createdBy: string;
    receiptCode: string;
    amount: number;
    description?: string;
    tags?: Array<string>;
    receiptData?: IHash<string>;
};
