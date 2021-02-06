import { CheckListItemStatusEnum } from "@Lib/enums/components/check-list-item-status";
import { CheckListStatusType } from "./check-list-status-type";

/**
 * Check list status item type
 */
export type CheckListStatusItemType = {
    _id?: string;
    status: CheckListItemStatusEnum;
    lastHistoryID?: string;
    requestDate: string;
    responseDate?: string;
    responseDescription?: string;
    history: Array<CheckListStatusType>;
};
