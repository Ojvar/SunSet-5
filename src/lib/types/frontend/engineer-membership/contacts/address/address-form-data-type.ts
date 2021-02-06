import { CityType } from "@Lib/types/frontend/global/city-type";
import { AddressDataType } from "./address-data-type";
import { AddressTypeDataType } from "./address-type-data-type";

/**
 * Address-register Form Data Type
 */
export type AddressFormDataType = {
    addressTypes: Array<AddressTypeDataType>;
    citiesList: Array<CityType>;
    formData: AddressDataType;
    name: string;
};
