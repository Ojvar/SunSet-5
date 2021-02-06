import IHash from "@Lib/interfaces/hash-interface";

/**
 * Create e-wallet type
 */
export type CreateEWalletType = {
    id?: string;
    walletCode: string;
    createdBy: string;
    description: string;
    walletData: IHash<string>;
};
