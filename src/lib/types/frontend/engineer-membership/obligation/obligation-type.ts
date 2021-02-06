import { ObligationItemListType } from "./obligation-item-list-type";

/**
 * Obligation type
 */
export type ObligationType = {
    _id: string;
    description: string;
    items: Array<ObligationItemListType>;
};
