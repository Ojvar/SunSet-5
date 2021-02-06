import { TickSliderType } from "../global/tick-slider-type";
import { LanguageNameType } from "./language-name-type";
import { LanguageSkillType } from "./language-skill-type";
import { LanguageType } from "./language-type";

/**
 * Language register form data type
 */
export type LanguageRegFormDataType = {
    disabledButton: boolean;
    showLanguageField: boolean;
    languageListName: Array<LanguageNameType>;
    newLanguageData: LanguageType;
    skillTypes: Array<LanguageSkillType>;
    ticks: Array<TickSliderType>;
};