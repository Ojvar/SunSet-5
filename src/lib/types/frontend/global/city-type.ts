import { GeometricType } from "./geometric-type";

/**
 * City type
 */
export type CityType = {
    _id: string;
    name: string;
    geometric?: GeometricType;
};
