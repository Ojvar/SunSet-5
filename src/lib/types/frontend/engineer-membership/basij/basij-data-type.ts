import { BasijCategoryType } from "./basij-category-type";
import { MembershipType } from "./membership-type";

/**
 * Basij data type
 */
export type BasijDataType = {
    _id: string;
    membershipType: MembershipType;
    basijType: BasijCategoryType;
    startDate: string;
    endDate: string;
};
