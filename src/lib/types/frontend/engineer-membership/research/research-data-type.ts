import { SubjectType } from "../../research/subject-type";

/**
 * Research data type
 */
export type ResearchDataType = {
    code: string;
    subject: SubjectType;
    title: string;
    printDate: string;
    publisher: string;
    isbn: string;
};
