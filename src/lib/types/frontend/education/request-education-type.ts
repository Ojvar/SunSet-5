import { EducationGradeType } from "./education-grade-type";
import { FieldOfStudyType } from "./field-of-study-type";

/**
 * Request education type
 */
export type RequestEducationType = {
    grade: EducationGradeType;
    fieldOfStudy: FieldOfStudyType;
};
