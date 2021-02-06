import { AcademicOrientationType } from "../education/academic-orientation-type";
import { EducationGradeType } from "../education/education-grade-type";
import { EducationStatusType } from "../education/education-status-type";
import { FieldOfStudyType } from "../education/field-of-study-type";
import { CountrySelectorDataType } from "./country-selector-type";

/**
 * Education Information type
 */
export type EducationInformationType = {
    _id?: string;
    educationGrade: EducationGradeType;
    fieldOfStudy: FieldOfStudyType;
    academicOrientation: AcademicOrientationType;
    university: {
        name: string;
        location?: CountrySelectorDataType;
    };
    educationStatus: EducationStatusType;
    startDate?: string;
    finishDate?: string;
    thesis?: string;
};
