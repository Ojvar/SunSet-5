import { IssuanceItemListType } from "./issuance-item-list-type";

/**
 * Issuance request type
 */
export type IssuanceRequestType = {
    code: string;
    description: string;
    items: Array<IssuanceItemListType>;
};
