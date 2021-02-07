import { resolve } from "path";

export class GlobalMethods {
    /**
     * Return root-relative path
     * @param path string[]
     */
    public static rPath(...path: string[]) {
        return resolve(...path);
    }
}
