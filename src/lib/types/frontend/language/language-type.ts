
import { LanguageNameType } from "./language-name-type";
import { LanguageSkillType } from "./language-skill-type";

/**
 * Language skill Information type
 */
export type LanguageType = {
    _id:string,
    languageName: LanguageNameType;
    languageOtherName?: string;
    languageSkill: LanguageSkillType;
};
