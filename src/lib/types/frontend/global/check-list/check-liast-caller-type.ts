import { CheckListCaller } from "@Lib/enums/components/check-list-caller";

/**
 * Check list caller type
 */
export type CheckListCallerType = {
    caller: CheckListCaller;
    userId?: string;
};
