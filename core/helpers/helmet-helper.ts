import { Application } from "express";
import Helmet from "helmet";
import { config } from "@CONFIGS/core/helmet";

/**
 * HelmetHelper class
 */
export class HelmetHelper {
    /**
     * Initialize
     */
    public async init(app: Application) {
        app.use(Helmet.contentSecurityPolicy(config.contentSecurityPolicy));

        app.use(Helmet.dnsPrefetchControl(config.dnsPrefetchControl));

        app.use(Helmet.expectCt(config.expectCt));

        app.use(Helmet.frameguard(config.frameguard));

        app.use(Helmet.hsts(config.hsts));

        app.use(
            Helmet.permittedCrossDomainPolicies(
                config.permittedCrossDomainPolicies
            )
        );

        app.use(Helmet.hidePoweredBy());

        app.use(Helmet.ieNoOpen());

        app.use(Helmet.noSniff());

        app.use(Helmet.referrerPolicy(config.referrerPolicy));

        app.use(Helmet.xssFilter());
    }
}
