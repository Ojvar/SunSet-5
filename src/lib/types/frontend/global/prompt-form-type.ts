import { CheckListItemStatusEnum } from "@Lib/enums/components/check-list-item-status";

/**
 * Prompt form type
 */
export type PromptFormType = {
    itemId: string;
    status: CheckListItemStatusEnum;
    title?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    historyId?: string;
};
