/**
 * Base filter interface
 */
export interface IBaseFilter {
    filter(data: any): Promise<any>;
}

/**
 * BaseFilter class
 */
export abstract class BaseFilter implements IBaseFilter {
    abstract filter(data: any): Promise<any>;
}
