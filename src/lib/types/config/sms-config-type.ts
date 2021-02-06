export type SmsConfigType = {
  url: string;
  number: string;
  headers: {
    apikey: string;
  };
  sendSms: boolean;
};
