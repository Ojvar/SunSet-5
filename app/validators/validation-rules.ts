export const RequiredRule: string = "required";
export const EMailRule: string = "email";
export const StringRule: string = "string";

export const MinRule = (value: number) => `min:${value}`;
export const MaxRule = (value: number) => `max:${value}`;
export const SizeRule = (value: number) => `size:${value}`;
