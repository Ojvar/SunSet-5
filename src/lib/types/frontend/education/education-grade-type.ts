import { FieldOfStudyType } from "./field-of-study-type";

export type EducationGradeType = {
    code: string;
    name: string;
    fieldOfStudy?: Array<FieldOfStudyType>;
};
