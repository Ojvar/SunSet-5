import { ProvinceType } from "../../global/province-type";
import { EmploymentLicenseType } from "./employment-license-type";

/**
 * Resume type
 */
export type OrganizationResumeDataType = {
    _id: string;
    province: ProvinceType;
    membershipId: string;
    /* TODO : change string to Date type */
    membershipStartDate: string;
    membershipFinishDate: string;
    employmentLicense?: EmploymentLicenseType;
    employmentLicenseStatus?: boolean;
};
