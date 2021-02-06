import { CityType } from "@Lib/types/frontend/global/city-type";
import { AddressTypeDataType } from "./address-type-data-type";
import { LocationDataType } from "./location-data-type";

/**
 * Address data type
 */
export type AddressDataType = {
    code?: string;
    addressType: AddressTypeDataType;
    isDefault: boolean;
    city: CityType;
    location: LocationDataType;
    phone: string;
};
