import { Types } from "mongoose";
import { BirthCertificateSerialType } from "../identification/birth-certificate-serial-type";

export type UserIdInfoDataSendType = {
  nationalId?: string;
  firstName: string;
  lastName: string;
  latinFirstName: string;
  latinLastName: string;
  fatherName: string;
  idNumber: string;
  idSerial: string;
  nationality: string;
  birthPlace: string;
  birthDate: string;
  idIssuance: string;
  issuancePlace: string;
  issuanceDate: string;
  nationalSerial?: string;
  userId: string;
  gender: string;
};
