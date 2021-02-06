import { IsarCategoryType } from "./isar-category-type";
import { IsarDataType } from "./isar-data-type";
import { RelationType } from "./relation-type";

/**
 * Isar register form data type
 */
export type IsarRegFormDataType = {
    relations: Array<RelationType>;
    isarCategory: Array<IsarCategoryType>;
    disabledButton: false;
    isar: IsarDataType;
};
