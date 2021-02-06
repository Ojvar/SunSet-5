import { BcLetterCodeType } from "./bc-letter-code-type";

/**
 * Birth certificate serial type
 */
export type BirthCertificateSerialType = {
    letter: BcLetterCodeType;
    number?: number;
    serial: number;
};
