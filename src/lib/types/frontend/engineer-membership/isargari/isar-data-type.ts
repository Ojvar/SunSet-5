import { RelationType } from "./relation-type";
import { IsarCategoryType } from "./isar-category-type";
/**
 * Isar Data Information type
 */
export type IsarDataType = {
    _id: string;
    relation: RelationType;
    isarCategory: IsarCategoryType;
    duration?: number;
    percent?: number;
};
