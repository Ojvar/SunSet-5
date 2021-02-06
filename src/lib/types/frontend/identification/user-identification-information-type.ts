import { CountrySelectorDataType } from "../global/country-selector-type";
import { CountryType } from "../global/country-type";
import { BirthCertificateSerialType } from "./birth-certificate-serial-type";
import { GenderType } from "./gender-type";

/**
 * user-identification-information-type
 * */
export type UserIdInfoType = {
    userId?: string;
    nationalSerial?: string;
    firstName: string;
    lastName: string;
    latinFirstName: string;
    latinLastName: string;
    fatherName: string;
    idNumber: number;
    idSerial?: BirthCertificateSerialType;
    nationality: CountryType;
    birthPlace: CountrySelectorDataType;
    birthDate: string;
    issuancePlace: CountrySelectorDataType;
    idIssuance: string;
    issuanceDate: string;
    gender: GenderType;
    nationalId?: string;
};
