import { CheckListItemStatusEnum } from "@Lib/enums/components/check-list-item-status";

/**
 * Check list status type
 */
export type CheckListStatusType = {
    _id?: string;
    status: CheckListItemStatusEnum;
    responseDate: string;
    responseDescription?: string;
    requestDate?: string;
};
