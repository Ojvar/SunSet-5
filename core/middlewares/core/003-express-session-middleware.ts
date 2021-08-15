import { config as ServerConfig } from "@CONFIGS/core/server";
import {
    ExpressHelper,
    MiddlewareInterface,
} from "@CORE/helpers/express-helper";
import { GlobalMethods } from "@CORE/helpers/global-methods-helper";
import Express from "express";
import { Store } from "express-session";

/**
 * Default export
 */
export default class CookieSession implements MiddlewareInterface {
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

        const app: Express.Application = this._expressHelper
            ?.App as Express.Application;

        /*  Select proper store */
        const store: Store = await this.getUserSelectedStore();

        const ExpressSession = (await import("express-session")).default;
        app.use(
            ExpressSession({
                secret: "MySecretCode_Comes_here",
                resave: false,
                saveUninitialized: false,
                cookie: config.session.cookie,
                store,
            }),
        );
    }

    /**
     * Get user selected store
     */
    private async getUserSelectedStore(): Promise<Store> {
        const config = ServerConfig();

        let sessionDriver: any = (
            await GlobalMethods.importFile(
                `./core/session-drivers/${config.sessionStore?.toLowerCase()}-session-driver`,
            )
        ).default;

        const SessionDriver: ISessionDriver = new sessionDriver() as ISessionDriver;
        const store: Store = await SessionDriver.setup();

        return store;
    }
}

/**
 * Session driver
 */
export interface ISessionDriver {
    setup(payload?: any): Promise<Store>;
}
