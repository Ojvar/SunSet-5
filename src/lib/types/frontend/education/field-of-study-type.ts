import { AcademicOrientationType } from "./academic-orientation-type";

/**
 * FieldOfStudyType
 */
export type FieldOfStudyType = {
    code: string;
    name: string;
    academicOrientation?: Array<AcademicOrientationType>;
};
