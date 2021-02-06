import { EWalletTransactionType } from "./e-wallet-transaction-type";
import { EWalletDataType } from "./ewallet-data-type";

/**
 * E-wallet store type
 */
export type EWalletStoreType = {
    eWallet: EWalletDataType;
    eWalletHistory: Array<EWalletTransactionType>;
};
