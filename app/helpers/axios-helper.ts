import { AxiosResponse, default as Axios } from "axios";

/* Export axios items */
export { Axios, AxiosResponse };

/**
 * Axios helper
 */
export class AxiosHelper {
    /**
     * get data
     * @param type
     * @param url
     * @param data
     * @param options
     */
    public static async get(
        url: string,
        options?: any
    ): Promise<AxiosResponse> {
        const result: AxiosResponse = await Axios.get(url, options);

        return result;
    }

    /**
     * Post data
     * @param type
     * @param url
     * @param data
     * @param options
     */
    public static async post(
        url: string,
        data: any,
        options?: any
    ): Promise<AxiosResponse> {
        const result: AxiosResponse = await Axios.post(url, data, options);

        return result;
    }

    /**
     * del data
     * @param type
     * @param url
     * @param data
     * @param options
     */
    public static async del(
        url: string,
        options?: any
    ): Promise<AxiosResponse> {
        const result: AxiosResponse = await Axios.delete(url, options);

        return result;
    }

    /**
     * patch data
     * @param type
     * @param url
     * @param data
     * @param options
     */
    public static async patch(
        url: string,
        data: any,
        options?: any
    ): Promise<AxiosResponse> {
        const result: AxiosResponse = await Axios.patch(url, data, options);

        return result;
    }
}
