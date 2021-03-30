import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";
import { default as Multer, StorageEngine, diskStorage } from "multer";

import { GlobalData } from "@/core/helpers/global-data-helper";
import { GlobalMethods } from "@/core/helpers/global-methods-helper";
import MimeTypes from "mime-types";
import { Request } from "express";
import { config } from "@CONFIGS/core/server";
import { v4 as uuidV4 } from "uuid";

/**
 * Default export
 */
export default class HelmetMiddleware implements MiddlewareInterface {
    private _expressHelper?: ExpressHelper;

    /**
     * Setup function
     * @param payload {any} Payload data
     */
    async setup(payload?: any): Promise<void> {
        this._expressHelper = payload as ExpressHelper;
    }

    /**
     * Check function
     * @param payload {any} Payload data
     */
    public async check(payload?: any): Promise<void> {
        const storage: StorageEngine = diskStorage({
            destination: (req: Request, file: any, callback: Function) => {
                callback(null, GlobalMethods.rPath(config.storage, "uploads"));
            },

            filename: (req: Request, file: any, callback: Function) => {
                let type: string = MimeTypes.extension(file.mimetype) || "";
                type = type ? `.${type}` : "";

                callback(null, `${uuidV4()}${type}`);
            },
        });

        const upload: Multer.Multer = Multer({ storage });
        GlobalData.upload = upload;
    }
}
