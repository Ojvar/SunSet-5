import { CheckListStatusItemType } from "./check-list-status-item-type";

/**
 * Check list item type
 */
export type CheckListItemType = {
    _id?: string;
    title: string;
    description?: string;
    status?: CheckListStatusItemType;
    code: string;
};
