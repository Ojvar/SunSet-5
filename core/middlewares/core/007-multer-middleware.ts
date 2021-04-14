import {
    ExpressHelper,
    MiddlewareInterface,
} from "core/helpers/express-helper";
import { default as Multer, StorageEngine, diskStorage } from "multer";

import { GlobalData } from "@/core/helpers/global-data-helper";
import { GlobalMethods } from "@/core/helpers/global-methods-helper";
import { default as MKDirP } from "mkdirp";
import MimeTypes from "mime-types";
import { Request } from "express";
import { config as ServerConfig } from "@CONFIGS/core/server";
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
        const config = ServerConfig();

        const storage: StorageEngine = diskStorage({
            destination: (req: Request, file: any, callback: Function) => {
                const path: string = GlobalMethods.rPath(
                    config.storage,
                    "uploads"
                );

                try {
                    MKDirP(path);
                } catch (err) {}

                callback(null, path);
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
