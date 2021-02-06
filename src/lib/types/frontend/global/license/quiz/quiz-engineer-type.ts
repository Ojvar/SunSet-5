import { GenderType } from "@Lib/types/frontend/identification/gender-type";
import { QuizScoreType } from "./quiz-score-type";
/**
 * Quiz engineer type
 */
export type QuizEngineerType = {
    code?: string;
    firstName: string;
    lastName: string;
    volunteerId: string;
    engineerId: string;
    gender: GenderType;
    nationalId: string;
    BirthYear: string;
    quizCourse: string;
    quizScore: QuizScoreType;
    quizResult?: string;
};
