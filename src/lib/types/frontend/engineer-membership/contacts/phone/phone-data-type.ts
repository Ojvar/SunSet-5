import { PhoneRelationType } from "./phone-relation-type";

/**
 * Phone data type
 */
export type PhoneDataType = {
    _id: string;
    phoneNumber: string;
    myself: boolean;
    relation?: PhoneRelationType;
};
