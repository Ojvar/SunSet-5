import { CityType } from "./city-type";
import { CountryType } from "./country-type";
import { ProvinceType } from "./province-type";

/**
 * CountrySelector data type
 */
export type CountrySelectorDataType = {
    country?: CountryType;
    province?: ProvinceType;
    city?: CityType;
};
