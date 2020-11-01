/**
 * Route Item DataType
 */
export type RouterItemType = {
  baseUrl: string;
  path: string;
  alias?: string;
  method: string;
  keys?: {
    name: string;
    optional: boolean;
    order: number;
  };
};
