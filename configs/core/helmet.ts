import { ContentSecurityPolicyOptions } from "helmet/dist/middlewares/content-security-policy";
import { ExpectCtOptions } from "helmet/dist/middlewares/expect-ct";
import { ReferrerPolicyOptions } from "helmet/dist/middlewares/referrer-policy";
import { StrictTransportSecurityOptions } from "helmet/dist/middlewares/strict-transport-security";
import { XDnsPrefetchControlOptions } from "helmet/dist/middlewares/x-dns-prefetch-control";
import { XFrameOptionsOptions } from "helmet/dist/middlewares/x-frame-options";
import { XPermittedCrossDomainPoliciesOptions } from "helmet/dist/middlewares/x-permitted-cross-domain-policies";

/**
 * Export config
 */
export const config = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [
                "'self'",
                "data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval'",
            ],
            scriptSrc: ["'self'", "data: blob: 'unsafe-inline' 'unsafe-eval'"],
            connectSrc: ["'self'", "data: blob: 'unsafe-inline'"],
            imgSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],
            frameSrc: ["'self'", " data: blob:"],
            styleSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],
            fontSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],
        },
        //  reportOnly: true,
    },

    dnsPrefetchControl: {},

    expectCt: {},

    frameguard: {},

    hidePoweredBy: {},

    hsts: {},

    ieNoOpen: {},

    noSniff: {},

    permittedCrossDomainPolicies: {},

    referrerPolicy: {
        policy: "no-referrer",
    },

    xssFilter: {},
} as HelmetConfigType;

/**
 * Helmet config type
 */
export type HelmetConfigType = {
    contentSecurityPolicy?: ContentSecurityPolicyOptions;
    dnsPrefetchControl?: XDnsPrefetchControlOptions;
    expectCt: ExpectCtOptions;
    frameguard: XFrameOptionsOptions;
    hsts: StrictTransportSecurityOptions;
    permittedCrossDomainPolicies: XPermittedCrossDomainPoliciesOptions;
    referrerPolicy: ReferrerPolicyOptions;
};
