import { LicenseLevelType } from "@Lib/types/frontend/global/license/license-level-type";
import { LicenseCompetencyType } from "@Lib/types/frontend/global/license/license-competency-data-type";

/**
 * License resume data type
 */
export type LicenseResumeDataType = {
    level: LicenseLevelType;
    competency: LicenseCompetencyType;
    issuanceDate: string;
    expirationDate: string;
    licenseSerial: string;
};
