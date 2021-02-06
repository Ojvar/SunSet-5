import { MaritalStatusType } from "./marital-status-type";

/**
 * Marital status data type
 */
export type MaritalStatusDataType = {
    status: MaritalStatusType;
    numberOfChildren?: number;
    nationalId?: string;
};
