import { CertificateTitleType } from "./certificate-title-type";

/**
 * Certificate data type
 */
export type CertificateDataType = {
    title: CertificateTitleType;
    issuanceDate: string;
    score: number;
    serial: string;
};
